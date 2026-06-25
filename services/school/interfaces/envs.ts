import { DPE } from "@duplojs/utils";
import { environmentVariableOrThrow } from "@duplojs/server-utils";

export const envs = await environmentVariableOrThrow(
	{
		PORT: DPE.coerce.number(),
		HOST: DPE.literal(["0.0.0.0", "localhost", "127.0.0.1"]),
		ENVIRONMENT: DPE.literal(["DEV", "PROD"]),
		MONGO_DATABASE_URL: DPE.string(),
		MONGO_DB: DPE.string(),
		DB_CONNECTION: DPE.coerce.boolean(),
		ASYNC_MESSAGE_MONGO_URL: DPE.string(),
		SERVICE_NAME: DPE.literal("school"),
		GLITCHTIP_DSN: DPE.string(),
		BOTTLE_BASE_URL: DPE.url(),
		HARBOR_BASE_URL: DPE.url(),
		CODEGEN_PATH: DPE.string(),
	},
	{
		paths: [".env", ".env.local"],
		justRead: true,
	},
);
