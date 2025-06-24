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

const baseDetails = zod.object({
	total: zod.number(),
});

export const endpointGetDocumentFolderRouteSchema = documentFolderSchema;

export const endpointFindManyDocumentFolderRouteSchema = documentFolderSchema.array();

export const endpointFindManyDocumentInWichDocumentExistRouteSchema = documentFolderSchema.array();

export const endpointFindManyDocumentFolderDetailsRouteSchema = baseDetails;

export const endpointFindManyDocumentInWichDocumentExistDetailsRouteSchema = baseDetails;
