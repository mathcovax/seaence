import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter, documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { dateYYYYMMDDObjecter, intObjecter } from "@vendors/clean";

const documentFolderSchema = zod.object({
	id: documentFolderIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	title: documentFolderNameObjecter.zodSchema,
	numberOfDocument: intObjecter.zodSchema,
	createdAt: dateYYYYMMDDObjecter.zodSchema,
});

export const endpointGetDocumentFolderRouteSchema = documentFolderSchema;

export const endpointSearchDocumentFolderRouteSchema = documentFolderSchema.array();

export const endpointGetCountSearchDocumentFolderRouteSchema = zod.number();
