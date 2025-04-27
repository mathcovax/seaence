import { abstractSectionNameEnum } from "@business/domains/common/abtrasctSection";
import { providerEnum } from "@business/domains/common/provider";
import { bakedDocumentLanguageEnum } from "@business/domains/entities/bakedDocument";

const abstractDetailsSchema = zod.record(
	zod.enum(abstractSectionNameEnum.toTuple()),
	zod.object({
		value: zod.string(),
	}).passthrough().optional(),
);

const resourcesSchema = zod.record(
	zod.enum(providerEnum.toTuple()),
	zod.object({
		name: zod.string(),
		url: zod.string(),
	}),
);

const keywordsSchema = zod.object({
	pound: zod.number().positive(),
	value: zod.string(),
});

export const endpointBakedDocumentSchema = zod.object({
	id: zod.string(),
	nodeSameRawDocumentId: zod.string(),
	title: zod.string(),
	language: zod.enum(bakedDocumentLanguageEnum.toTuple()),
	abstract: zod.string().nullable(),
	abstractDetails: abstractDetailsSchema.nullable(),
	resources: resourcesSchema,
	keywords: keywordsSchema.array(),
});
