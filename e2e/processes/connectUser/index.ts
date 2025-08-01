import { type WebSiteInstance } from "@playwright";
import { setupFirebaseAuth } from "@processes/setupFirebaseAuth";
import { evalGetUserIdToken } from "./evalGetUserIdToken";
import { HorizonAPI } from "@providers/horizon";
import { setLocalStorageItem } from "@processes/setLocalStorageItem";
import { type auth } from "firebase-admin";
import { envs } from "@envs";
import { getFirebaseUser } from "@providers/firebase";

export interface ConnectUserParams {
	webSite: WebSiteInstance;
	firebaseAuth: auth.Auth;
}

export async function connectUser(
	{
		webSite,
		firebaseAuth,
	}: ConnectUserParams,
) {
	const { customToken } = await getFirebaseUser({
		firebaseAuth,
		email: envs.TEST_USER_EMAIL,
	});

	await setupFirebaseAuth({
		webSite,
		customToken,
	});

	const idToken = await webSite.playwrightPage.evaluate(
		evalGetUserIdToken,
	);

	const { body: { accessToken } } = await HorizonAPI
		.login(idToken)
		.iWantInformation("user.logged");

	await setLocalStorageItem({
		webSite,
		key: "accessToken",
		value: JSON.stringify(accessToken),
	});

	await webSite.playwrightPage.reload();
}
