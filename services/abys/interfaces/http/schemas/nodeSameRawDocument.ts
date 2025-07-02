import { NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { endpointBakedDocumentSchema } from "./bakedDocument";

export const endpointCookedNodeSameRawDocumentSchema = endpointBakedDocumentSchema.omit({
	id: true,
});

const {
	id,
	lastCookingDates,
	lastUpdate,
	rawDocumentWrapper,
	uniqueField,
} = NodeSameRawDocumentEntity.propertiesDefinition;

export const nodeSameRawDocumentSchema = zod.object({
	id: id.zodSchema,
	lastCookingDates: lastCookingDates.zodSchema,
	lastUpdate: lastUpdate.zodSchema,
	rawDocumentWrapper: rawDocumentWrapper.zodSchema,
	uniqueField: uniqueField.zodSchema,
});

export const endpointFindNodeSameRawDocumentSchema = nodeSameRawDocumentSchema;

