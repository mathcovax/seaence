import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { nodeSameRawDocumentIdObjecter, documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { commonDateObjecter } from "@vendors/clean";

const documentInFolderSchema = zod.object({
	documentFolderId: documentFolderIdObjecter.zodSchema,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.zodSchema,
	name: documentInFolderNameObjecter.zodSchema,
	addedAt: commonDateObjecter.zodSchema,
});

export const endpointGetDocumentInFolderRouteSchema = documentInFolderSchema;

export const endpointSearchDocumentInFolderRouteSchema = documentInFolderSchema.array();

export const endpointGetCountSearchDocumentInFolderRouteSchema = zod.object({
	total: zod.number(),
});
