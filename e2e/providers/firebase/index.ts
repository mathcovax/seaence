import { envs } from "@envs";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import firebaseAdmin, { type auth, type ServiceAccount } from "firebase-admin";
import { type Page } from "@playwright/test";
import { evalSetupFirebaseAuth } from "./evalSetupFirebaseAuth";

export async function initFirebaseAuth() {
	if (!existsSync(envs.FIREBASE_CREDENTIAL_PATH)) {
		throw new Error("Firebase credential not found.");
	}

	const credential: ServiceAccount = JSON.parse(
		await readFile(envs.FIREBASE_CREDENTIAL_PATH, "utf-8"),
	);

	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(credential),
	});

	const firebaseAuth = firebaseAdmin.auth();

	return { firebaseAuth };
}

function createUserTestId(testUserId: string) {
	return `e2e-${testUserId}` as const;
}

export interface CreateFirebaseUserParams {
	firebaseAuth: auth.Auth;
	testUserId: string;
}

export async function createFirebaseUser(
	{
		firebaseAuth,
		testUserId,
	}: CreateFirebaseUserParams,
) {
	const userFirebaseUid = createUserTestId(testUserId);
	const userFirebaseEmail = `${userFirebaseUid}@gmail.com` as const;

	await firebaseAuth.createUser({
		uid: userFirebaseUid,
		email: userFirebaseEmail,
	});

	const customToken = await firebaseAuth.createCustomToken(userFirebaseUid);

	return {
		userFirebaseUid,
		userFirebaseEmail,
		customToken,
	};
}

export interface DeleteFirebaseUserParams {
	firebaseAuth: auth.Auth;
	userFirebaseUid: ReturnType<typeof createUserTestId>;
}

export function deleteFirebaseUser(
	{
		firebaseAuth,
		userFirebaseUid,
	}: DeleteFirebaseUserParams,
) {
	return firebaseAuth.deleteUser(userFirebaseUid);
}

export interface SetupFirebaseAuthParams {
	playwrightPage: Page;
	customToken: string;
}

export async function setupFirebaseAuth(
	{
		playwrightPage,
		customToken,
	}: SetupFirebaseAuthParams,
) {
	await playwrightPage.addScriptTag({ url: "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js" });
	await playwrightPage.addScriptTag({ url: "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth-compat.js" });
	await playwrightPage.evaluate(
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
