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
		RETRIES: zod.coerce.number(),
		WORKER: zod.coerce.number(),
		CI: zod.booleanInString(),
		BASE_URL: zod.string().url(),
	})
	.parse(process.env);
