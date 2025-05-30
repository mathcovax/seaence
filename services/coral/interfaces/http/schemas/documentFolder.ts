import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter, documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { dateYYYYMMDDObjecter, intObjecter } from "@vendors/clean";

const documentFolderSchema = zod.object({
	id: documentFolderIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
	title: documentFolderTitleObjecter.zodSchema,
	numberOfDocument: intObjecter.zodSchema,
	createdAt: dateYYYYMMDDObjecter.zodSchema,
});

export const endpointGetDocumentFolderRouteSchema = documentFolderSchema;

export const endpointSearchDocumentFolderRouteSchema = documentFolderSchema.array();

export const endpointGetDetailsSearchDocumentFolderRouteSchema = zod.object({
	numberOfDocumentFolders: zod.number(),
});
