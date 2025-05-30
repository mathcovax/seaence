import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { documentIdObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { dateYYYYMMDDObjecter } from "@vendors/clean";

const documentInFolderSchema = zod.object({
	documentFolderId: documentFolderIdObjecter.zodSchema,
	id: documentIdObjecter.zodSchema,
	title: documentTitleObjecter.zodSchema,
	addedAt: dateYYYYMMDDObjecter.zodSchema,
});

export const endpointGetDocumentInFolderRouteSchema = documentInFolderSchema;

export const endpointSearchDocumentInFolderRouteSchema = documentInFolderSchema.array();

export const endpointGetDetailsSearchDocumentInFolderRouteSchema = zod.object({
	numberOfDocumentsInFolder: zod.number(),
});
