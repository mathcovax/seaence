import { bakedDocumentObjecter } from "@business/entities/bakedDocument";
import { postObjecter } from "@business/entities/post";

export const endpointDocumentPage = zod.object({
	document: bakedDocumentObjecter.zodSchema,
	posts: postObjecter.zodSchema.array(),
});
