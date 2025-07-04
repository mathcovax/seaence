import { zod } from "@vendors/clean";
import { BakedDocument } from "./bakedDocument";
import { Post } from "./post";
import { Answer } from "./answer";

export namespace Page {
	export const reportingBakedDocumentTranslationList = zod
		.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		});

	export const reportingBakedDocumentTranslation = zod.object({
		bakedDocument: BakedDocument.index,
		reporting: zod.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		}),
	});

	export const moderationPost = zod.object({
		post: Post.index,
		unprocessedTotalCount: zod.number(),
	});

	export const moderationAnswer = zod.object({
		answer: Answer.index,
		unprocessedTotalCount: zod.number(),
	});
}
