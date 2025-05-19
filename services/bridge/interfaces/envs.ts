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
		CORS_ALLOW_ORIGIN: zod.string(),
	})
	.parse(process.env);
