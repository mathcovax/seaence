import test from "playwright/test";
import { createWebsite, type Website } from "@duplojs/playwright";
import { envs } from "@envs";

interface TestFixtures {
	website: Website;
}

export const testClient = test.extend<TestFixtures>({
	async website({ page, context }, use) {
		const website = createWebsite({
			playwrightPage: page,
			playwrightBrowserContext: context,
			envConfig: {
				baseUrl: envs.BASE_URL,
			},
		});

		await use(website);
	},
});
