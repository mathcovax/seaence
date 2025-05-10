import { providerEnum } from "@interfaces/providers/elastic/common/provider";
import { articleTypeSchema } from "./common";

export const splitDateSchema = zod
	.object({
		day: zod.number().nullable(),
		month: zod.number().nullable(),
		year: zod.number(),
	});

export const entrypointDocumentSchema = zod
	.object({
		bakedDocumentId: zod.string(),
		title: zod.string(),
		articleTypes: articleTypeSchema.array(),
		authors: zod.string().array(),
		summary: zod.string().nullable(),
		abstract: zod.string().nullable(),
		providers: zod.enum(providerEnum.toTuple()).array(),
		keywords: zod.string().array(),
		webPublishDate: zod.string().nullable(),
		webPublishSplitDate: splitDateSchema.nullable(),
		journalPublishDate: zod.string().nullable(),
		journalPublishSplitDate: splitDateSchema.nullable(),
	});
