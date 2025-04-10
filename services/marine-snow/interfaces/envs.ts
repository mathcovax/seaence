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
		PUBMED_API_KEY: zod.string(),
		PUBMED_BASE_URL: zod.string().url(),
		ABYS_BASE_URL: zod.string().url(),
		DB_CONNECTION: zod.booleanInString(),
		PUBMED_RESOURCE_BASE_URL: zod.string().url(),
	})
	.parse(process.env);
