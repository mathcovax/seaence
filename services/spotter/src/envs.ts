import { zod } from "@duplojs/core";

export const envs = zod
	.object({
		VITE_HORIZON_ENTRYPOINT_BASE_URL: zod.string().url(),
		VITE_GLITCHTIP_DSN: zod.string(),
		VITE_ENVIRONEMENT: zod.enum(["DEV", "PROD"]),
	})
	.parse(import.meta.env);
