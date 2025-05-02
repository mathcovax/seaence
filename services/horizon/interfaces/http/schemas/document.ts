export const endpointDocumentSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
});
