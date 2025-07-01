import { zod } from "@duplojs/core";
import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv }),
	);
}

export const envs = zod
	.object({
		PORT: zod.coerce.number(),
		HOST: zod.enum(["0.0.0.0"]),
		ENVIROMENT: zod.enum(["DEV", "PROD"]),
		MONGO_DATABASE_URL: zod.string(),
		MONGO_DB: zod.string(),
		DB_CONNECTION: zod.booleanInString(),
		ASYNC_MESSAGE_MONGO_URL: zod.string(),
		SERVICE_NAME: zod.literal("school").default("school"),
		GLITCHTIP_DSN: zod.string(),
		BOTTLE_BASE_URL: zod.string().url(),
		HARBOR_BASE_URL: zod.string().url(),
	})
	.parse(process.env);
