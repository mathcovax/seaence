import { chromium } from "playwright";
import { Qyu } from "qyu";
import { parentPort } from "worker_threads";
import { type JobsResult, type JobsParams } from "..";
import { type Translate } from "@business/entites/translate";
import { TechnicalError } from "@vendors/clean";
import { scliceText } from "./sliceText";

const queue = new Qyu({ concurrency: 1 });

async function initWebPage() {
	const browser = await chromium.launch({
		executablePath: "/usr/bin/chromium-browser",
		args: ["--no-sandbox", "--disable-dev-shm-usage"],
		headless: true,
	});
	const page = await browser.newPage();

	await page.goto("https://translate.google.fr");
	const concentButton = page.getByRole("button", { name: "Tout accepter" });
	await concentButton.click({ timeout: 3000 });

	return {
		browser,
		page,
	};
}

let {
	page,
	browser,
} = await initWebPage();

parentPort!.postMessage("started");

const languageMapper: Record<Translate.Language, string> = {
	"fr-FR": "fr",
	"en-US": "en",
};

const iconLocator = "path[d=\"M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z\"]";

const textChunk = 5000;
// 30 min
const resteTimeInterval = 1_800_000;
const lastResetTime = Date.now();

parentPort!.on(
	"message",
	({ text, language, id }: JobsParams) => {
		void Promise.all(
			scliceText(text, { maxSize: textChunk })
				.map(
					(scliceText) => queue.add(
						async() => {
							if (Date.now() - resteTimeInterval >= lastResetTime) {
								await page.close();
								await browser.close();
								const newWebPage = await initWebPage();
								page = newWebPage.page;
								browser = newWebPage.browser;
							}

							await page.goto(`https://translate.google.fr/?sl=auto&tl=${languageMapper[language]}&text=${encodeURI(scliceText)}&op=translate`);

							await page
								.locator(iconLocator)
								.isEnabled({ timeout: 3000 });

							const element = page
								.locator("i", { hasText: "swap_horiz" })
								.first();

							if (await element.isEnabled({ timeout: 3000 })) {
								await element.click({ timeout: 3000 });
							}

							const url = new URL(page.url());

							const resultText = url.searchParams.get("text");

							if (resultText === null) {
								throw new TechnicalError("missing-result-text");
							}

							return resultText;
						},
					),
				),
		)
			.then(
				(sclicedText) => {
					parentPort!.postMessage({
						id,
						text: sclicedText.join(""),
					} satisfies JobsResult);
				},
			);
	},
);
