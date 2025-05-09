import { zod } from "@vendors/clean";
import { articleTypeObjecter } from "./common/articleType";

export const bakedDocumentSearchResultObjecter = zod
	.object({
		score: zod.number(),
		bakedDocumentId: zod.string(),
		title: zod.string(),
		articleType: articleTypeObjecter.zodSchema.array(),
		authors: zod.string().array(),
		webPublishDate: zod.string().nullable(),
		journalPublishDate: zod.string().nullable(),
		summary: zod.string().nullable(),
		keywords: zod.string().array().nullable(),
	})
	.createValueObjecter("bakedDocumentSearchResult");
