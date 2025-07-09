import test from "@playwright/test";
import { webSiteEngine, type WebSiteInstance } from "./webSiteEngine";

interface TestExtend {
	webSite: WebSiteInstance;
}

export const testCLient = test.extend<TestExtend>({
	async webSite({ page }, use) {
		const webSite = webSiteEngine(page);
		await use(webSite);
	},
});
