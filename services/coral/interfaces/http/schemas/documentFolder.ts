import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter, documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { commonDateObjecter, intObjecter } from "@vendors/clean";

const documentFolderSchema = zod.object({
	id: documentFolderIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	name: documentFolderNameObjecter.zodSchema,
	numberOfDocument: intObjecter.zodSchema,
	createdAt: commonDateObjecter.zodSchema,
});

export const endpointGetDocumentFolderRouteSchema = documentFolderSchema;

export const endpointSearchDocumentFolderRouteSchema = documentFolderSchema.array();

export const endpointGetCountSearchDocumentFolderRouteSchema = zod.object({
	total: zod.number(),
});
