import { zod } from "@vendors/clean";

export const documentSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
});
