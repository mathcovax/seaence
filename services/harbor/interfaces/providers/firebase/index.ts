import { envs } from "@interfaces/envs";
import firebaseAdmin, { type ServiceAccount } from "firebase-admin";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

export const firebaseAuth = await (async() => {
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

	if (envs.DB_CONNECTION) {
		try {
			await firebaseAuth.getUsers([{ email: "campani.mathieu@gmail.com" }]);
		} catch {
			throw new Error("Failed connect to firebase.");
		}
	}

	return firebaseAuth;
})();
