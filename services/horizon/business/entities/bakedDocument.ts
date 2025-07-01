import { createEnum, zod, flexibleDateObjecter } from "@vendors/clean";
import { ArticleType } from "./common/articleType";
import { Provider } from "./common/provider";
import { Post } from "./forum/post";

export namespace BackedDocument {
	export const languageEnum = createEnum([
		"fr-FR",
		"en-US",
	]);

	export const language = zod
		.enum(languageEnum.toTuple());

	export const resourceProviderEnum = createEnum([
		"DOIFoundation",
		...Provider.indexEnum.toTuple(),
	]);

	export const resourceProvider = zod.enum(resourceProviderEnum.toTuple());

	export const id = zod.string();

	export const index = zod
		.object({
			id,
			nodeSameRawDocumentId: zod.string(),
			articleTypes: ArticleType.index.array(),
			title: zod.string(),
			language,
			abstract: zod.string().nullable(),
			authors: zod
				.object({
					name: zod.string(),
					affiliations: zod.string().array().nullable(),
				})
				.array(),
			abstractDetails: zod
				.object({
					name: zod.string(),
					label: zod.string(),
					content: zod.string(),
				})
				.array()
				.nullable(),
			resources: zod
				.object({
					resourceProvider: resourceProvider,
					url: zod.string(),
				})
				.array(),
			keywords: zod
				.object({
					value: zod.string(),
				})
				.array(),
			webPublishDate: flexibleDateObjecter.zodSchema.nullable(),
			journalPublishDate: flexibleDateObjecter.zodSchema.nullable(),
		});

	export const searchResult = zod
		.object({
			score: zod.number(),
			bakedDocumentId: zod.string(),
			nodeSameRawDocumentId: zod.string(),
			title: zod.string(),
			articleTypes: ArticleType.index.array(),
			authors: zod.string().array(),
			webPublishDate: zod.string().nullable(),
			journalPublishDate: zod.string().nullable(),
			summary: zod.string().nullable(),
			keywords: zod.string().array().nullable(),
		});
}
