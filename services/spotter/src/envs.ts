import { zod } from "@duplojs/core";

export const envs = zod
	.object({
		VITE_HORIZON_ENTRYPOINT_BASE_URL: zod.string().url(),
		VITE_SPOTTER_GLITCHTIP_DSN: zod.string(),
		VITE_ENVIRONMENT: zod.enum(["DEV", "PROD"]),
	})
	.parse(import.meta.env);
