import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";
import { z as zod } from "zod";

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv }),
	);
}

export const envs = zod
	.object({
		RETRIES: zod.coerce.number(),
		WORKER: zod.coerce.number(),
		CI: zod.enum(["true", "false"]).transform((value) => value === "true"),
		BASE_URL: zod.string().url(),
		FIREBASE_CREDENTIAL_PATH: zod.string(),
	})
	.parse(process.env);
