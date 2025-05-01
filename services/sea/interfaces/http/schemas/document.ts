import { abstractSectionNameEnum } from "@interfaces/providers/elastic/common/abstractSection";

export const splitDateSchema = zod
	.object({
		day: zod.number().nullable(),
		month: zod.number().nullable(),
		year: zod.number(),
	});

export const abstractSectionNameEnumSchema = zod.enum(abstractSectionNameEnum.toTuple());

export const entrypointDocumentSchema = zod
	.object({
		abysBakedDocumentId: zod.string(),
		title: zod.string(),
		abstract: zod.string().nullable(),
		abstractDetails: zod.record(
			abstractSectionNameEnumSchema,
			zod.object({
				value: zod.string(),
			}).optional(),
		).nullable(),
		resources: zod.object({
			pubmed: zod.object({
				name: zod.string(),
				url: zod.string(),
			}).optional(),
		}),
		keywords: zod.object({
			value: zod.string(),
		}).array(),
		webPublishDate: zod.coerce.date().nullable(),
		webPublishSplitDate: splitDateSchema.nullable(),
		journalPublishDate: zod.coerce.date().nullable(),
		journalPublishSplitDate: splitDateSchema.nullable(),
	});
