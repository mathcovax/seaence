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
		abysBakedDocumentId: zod.string(),
		title: zod.string(),
		articleTypes: articleTypeSchema.array(),
		authors: zod.string().array(),
		summary: zod.string().nullable(),
		abstract: zod.string().nullable(),
		providers: zod.enum(providerEnum.toTuple()).array(),
		keywords: zod.string().array(),
		webPublishDate: zod.coerce.date().nullable(),
		webPublishSplitDate: splitDateSchema.nullable(),
		journalPublishDate: zod.coerce.date().nullable(),
		journalPublishSplitDate: splitDateSchema.nullable(),
	});
