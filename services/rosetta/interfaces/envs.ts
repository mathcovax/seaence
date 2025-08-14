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
		GOOGLE_SCRAPE_REPLICAS: zod.coerce.number(),
		DB_CONNECTION: zod.booleanInString(),
		LIBRETRANSLATE_BASE_URL: zod.string().url(),
		GLITCHTIP_DSN: zod.string(),
		LIBRETRANSLATE_KEY: zod.string(),
	})
	.parse(process.env);
