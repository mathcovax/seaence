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
		HARBOR_BASE_URL: zod.string().url(),
		SCHOOL_BASE_URL: zod.string().url(),
		ABYS_BASE_URL: zod.string().url(),
		SEA_BASE_URL: zod.string().url(),
		CORS_ALLOW_ORIGIN: zod.string(),
		GLITCHTIP_DSN: zod.string(),
		BOTLLE_BASE_URL: zod.string().url(),
	})
	.parse(process.env);
