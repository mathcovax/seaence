import test from "@playwright/test";
import { createWebSiteEngine, type WebSiteEngine } from "./webSiteEngine";

interface TestExtend {
	webSite: WebSiteEngine;
}

export const testCLient = test.extend<TestExtend>({
	async webSite({ page }, use) {
		const webSite = createWebSiteEngine(page);
		await use(webSite);
	},
});
