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
		ROSETTA_HOST: zod.enum(["rosetta", "localhost"]),
		ROSETTA_PROTOCOL: zod.enum(["http", "https"]),
		ROSETTA_PORT: zod.number(),
	})
	.parse(process.env);
