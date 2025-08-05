import test from "@playwright/test";
import { webSiteEngine, type WebSiteInstance } from "./webSiteEngine";
import { type auth } from "firebase-admin";
import { initFirebaseAuth } from "@providers/firebase";

interface TestExtend {
	webSite: WebSiteInstance;
	firebaseAuth: auth.Auth;
}

export const testCLient = test.extend<TestExtend>({
	async webSite({ page }, use) {
		const webSite = webSiteEngine(page);
		await use(webSite);
	},
	async firebaseAuth({ page: _page }, use) {
		const { firebaseAuth } = await initFirebaseAuth();
		await use(firebaseAuth);
	},
});
