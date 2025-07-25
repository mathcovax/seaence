import { envs } from "@envs";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import firebaseAdmin, { type auth, type ServiceAccount } from "firebase-admin";

let memoFirebaseAuth: auth.Auth | undefined = undefined;

export async function initFirebaseAuth() {
	if (memoFirebaseAuth) {
		return { firebaseAuth: memoFirebaseAuth };
	}
	if (!existsSync(envs.FIREBASE_CREDENTIAL_PATH)) {
		throw new Error("Firebase credential not found.");
	}

	const credential: ServiceAccount = JSON.parse(
		await readFile(envs.FIREBASE_CREDENTIAL_PATH, "utf-8"),
	);

	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(credential),
	});

	memoFirebaseAuth = firebaseAdmin.auth();

	const firebaseAuth = memoFirebaseAuth;

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

export interface GetFirebaseUserParams {
	firebaseAuth: auth.Auth;
	email: string;
}

export async function getFirebaseUser(
	{
		firebaseAuth,
		email,
	}: GetFirebaseUserParams,
) {
	const user = await firebaseAuth.getUserByEmail(email);

	const customToken = await firebaseAuth.createCustomToken(user.uid);

	return {
		userFirebaseUid: user.uid,
		userFirebaseEmail: email,
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
