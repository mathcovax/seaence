import { environmentVariableOrThrow } from "@duplojs/server-utils";
import { DPE } from "@duplojs/utils";

export const envs = await environmentVariableOrThrow(
	{
		PORT: DPE.coerce.number(),
		HOST: DPE.literal(["0.0.0.0", "localhost", "127.0.0.1"]),
		ENVIRONMENT: DPE.literal(["DEV", "PROD"]),
		CORS_ALLOW_ORIGIN: DPE.string(),
		GLITCHTIP_DSN: DPE.string(),

		HARBOR_BASE_URL: DPE.url(),
		SCHOOL_BASE_URL: DPE.url(),
		ABYS_BASE_URL: DPE.url(),
		SEA_BASE_URL: DPE.url(),
		BOTTLE_BASE_URL: DPE.url(),
		BEACON_BASE_URL: DPE.url(),
		CORAL_BASE_URL: DPE.url(),
	},
	{
		paths: [".env"],
		justRead: true,
	},
);
