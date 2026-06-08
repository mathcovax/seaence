import { environmentVariableOrThrow } from "@duplojs/server-utils";
import { DPE } from "@duplojs/utils";

export const envs = await environmentVariableOrThrow(
	{
		RETRIES: DPE.coerce.number(),
		WORKER: DPE.coerce.number(),
		CI: DPE.coerce.boolean(),
		BASE_URL: DPE.url(),
		FIREBASE_CREDENTIAL_PATH: DPE.string(),
	},
	{
		paths: [".env", ".env.local"],
		justRead: true,
	},
);
