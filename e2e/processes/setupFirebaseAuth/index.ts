import { type WebSiteInstance } from "@playwright";
import { evalSetupFirebaseAuth } from "./evalSetupFirebaseAuth";

export interface SetupFirebaseAuthParams {
	webSite: WebSiteInstance;
	customToken: string;
}

export async function setupFirebaseAuth(
	{
		webSite,
		customToken,
	}: SetupFirebaseAuthParams,
) {
	await webSite.playwrightPage.addScriptTag({ url: "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js" });
	await webSite.playwrightPage.addScriptTag({ url: "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth-compat.js" });
	await webSite.playwrightPage.evaluate(
		evalSetupFirebaseAuth,
		[
			customToken,
			{
				apiKey: "AIzaSyBi30m3j1SmMqApwnVCtRM0yHwpREbHynQ",
				authDomain: "seaence-65707.firebaseapp.com",
				projectId: "seaence-65707",
				storageBucket: "seaence-65707.firebasestorage.app",
				messagingSenderId: "529736055664",
				appId: "1:529736055664:web:61e2aa7f8dc4a0095b2db5",
			},
		],
	);
}
