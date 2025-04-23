import { zod } from "@duplojs/core";

export const envs = zod
	.object({
		VITE_HORIZON_ENTRYPOINT_BASE_URL: zod.string().url(),
	})
	.parse(import.meta.env);
