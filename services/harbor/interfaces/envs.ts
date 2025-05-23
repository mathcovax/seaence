import { zod } from "@duplojs/core";
import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv }),
	);
}

const minLenghtJWTKey = 10;

export const envs = zod
	.object({
		PORT: zod.coerce.number(),
		HOST: zod.enum(["0.0.0.0"]),
		ENVIROMENT: zod.enum(["DEV", "PROD"]),
		FIREBASE_CREDENTIAL_PATH: zod.string(),
		JWT_KEY: zod.string().min(minLenghtJWTKey),
		JWT_TIME: zod.coerce.number(),
		DB_CONNECTION: zod.booleanInString(),
		BOTTLE_BASE_URL: zod.string().url(),
		ASYNC_MESSAGE_MONGO_URL: zod.string(),
		SERVICE_NAME: zod.literal("harbor").default("harbor"),
	})
	.parse(process.env);
