import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { documentIdObjecter, documentSummaryObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";

const documentInFolderSchema = zod.object({
	documentFolderId: documentFolderIdObjecter.zodSchema,
	id: documentIdObjecter.zodSchema,
	title: documentTitleObjecter.zodSchema,
	summary: documentSummaryObjecter.zodSchema,
});

export const endpointGetDocumentInFolderRouteSchema = documentInFolderSchema;

export const endpointSearchDocumentInFolderRouteSchema = zod.object({
	documentsInFolder: documentInFolderSchema.array(),
	numberOfDocumentInFolder: zod.number(),
});
