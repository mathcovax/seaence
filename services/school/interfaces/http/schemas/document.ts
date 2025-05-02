import { zod } from "@vendors/clean";

export const endpointDocumentSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
});
