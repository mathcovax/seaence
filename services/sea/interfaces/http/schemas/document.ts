import { articleTypeEnum } from "@interfaces/providers/elastic/common/articleType";
import { providerEnum } from "@interfaces/providers/elastic/common/provider";

export const splitDateSchema = zod
	.object({
		day: zod.number().nullable(),
		month: zod.number().nullable(),
		year: zod.number(),
	});

export const articleTypeSchema = zod.enum(articleTypeEnum.toTuple());

export const entrypointDocumentSchema = zod
	.object({
		abysBakedDocumentId: zod.string(),
		title: zod.string(),
		articleTypes: articleTypeSchema.array(),
		authors: zod.object({
			name: zod.string(),
			affiliations: zod.string().array().nullable(),
		}).array(),
		abstract: zod.string(),
		abstractDetails: zod
			.object({
				name: zod.string(),
				content: zod.string(),
			})
			.array()
			.nullable(),
		providers: zod.object({
			value: zod.enum(providerEnum.toTuple()),
		}).array(),
		keywords: zod.object({
			value: zod.string(),
		}).array(),
		webPublishDate: zod.coerce.date().nullable(),
		webPublishSplitDate: splitDateSchema.nullable(),
		journalPublishDate: zod.coerce.date().nullable(),
		journalPublishSplitDate: splitDateSchema.nullable(),
	});
