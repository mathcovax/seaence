import { zod } from "@duplojs/core";

export const envs = zod
	.object({
		VITE_BRIDGE_ENTRYPOINT_BASE_URL: zod.string().url(),
		VITE_LIGHTHOUSE_GLITCHTIP_DSN: zod.string(),
		VITE_ENVIRONMENT: zod.enum(["DEV", "PROD"]),
		VITE_SPOTTER_BASE_URL: zod.string().url(),
	})
	.parse(import.meta.env);
