import { endpointBakedDocumentSchema } from "./bakedDocument";

export const endpointCookedNodeSameRawDocumentSchema = endpointBakedDocumentSchema.omit({
	id: true,
});

