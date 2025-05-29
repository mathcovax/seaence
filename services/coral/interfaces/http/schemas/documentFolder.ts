import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter, documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { intObjecter } from "@vendors/clean";

export const endpointGetDocumentFolderRoute = zod.object({
	id: documentFolderIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	title: documentFolderTitleObjecter.zodSchema,
	numberOfDocument: intObjecter.zodSchema,
});
