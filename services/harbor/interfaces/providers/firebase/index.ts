import { envs } from "@interfaces/envs";
import firebaseAdmin, { type ServiceAccount } from "firebase-admin";
import { existsSync, promises as fsPromises } from "fs";

if (!existsSync(envs.FIREBASE_CREDENTIAL_PATH)) {
	throw new Error("Firebase credential not found.");
}

async function loadFirebaseCredential(): Promise<ServiceAccount> {
	const fileContent = await fsPromises.readFile(envs.FIREBASE_CREDENTIAL_PATH, "utf-8");
	return JSON.parse(fileContent);
}

const credential: ServiceAccount = await loadFirebaseCredential();

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(credential),
});

export const firebaseAuth = firebaseAdmin.auth();
