import { DPE } from "@duplojs/utils";
import { environmentVariableOrThrow } from "@duplojs/server-utils";

export const envs = await environmentVariableOrThrow(
	{
		CODEGEN_PATH: DPE.string(),
		PORT: DPE.coerce.number(),
		HOST: DPE.literal(["0.0.0.0", "localhost", "127.0.0.1"]),
		ENVIRONMENT: DPE.literal(["DEV", "PROD"]),
		MONGO_DATABASE_URL: DPE.string(),
		MONGO_DB: DPE.string(),
		DB_CONNECTION: DPE.coerce.boolean(),
		GLITCHTIP_DSN: DPE.string(),
		ASYNC_MESSAGE_MONGO_URL: DPE.string(),
		SERVICE_NAME: DPE.literal("coral"),
	},
	{
		paths: [".env"],
		justRead: true,
	},
);
