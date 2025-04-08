import { envs } from "@interfaces/envs";
import firebaseAdmin, { type ServiceAccount } from "firebase-admin";
import { existsSync, readFileSync } from "fs";

if (!existsSync(envs.FIREBASE_CREDENTIAL_PATH)) {
	throw new Error("Firebase credential not found.");
}

const credential: ServiceAccount = JSON.parse(
	readFileSync(envs.FIREBASE_CREDENTIAL_PATH, "utf-8"),
);

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(credential),
});

export const firebaseAuth = firebaseAdmin.auth();
