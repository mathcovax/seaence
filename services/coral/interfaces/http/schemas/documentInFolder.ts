import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { documentIdObjecter, documentSummaryObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";

export const endpointGetDocumentInFolderRoute = zod.object({
	documentFolderId: documentFolderIdObjecter.zodSchema,
	id: documentIdObjecter.zodSchema,
	title: documentTitleObjecter.zodSchema,
	summary: documentSummaryObjecter.zodSchema,
});
