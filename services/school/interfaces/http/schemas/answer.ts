import { answerStatusEnum } from "@business/domains/entities/answer";

export const endpointAnswerSchema = zod.object({
	id: zod.string(),
	postId: zod.string(),
	content: zod.string(),
	authorId: zod.string(),
	authorName: zod.string().nullable(),
	status: zod.enum(answerStatusEnum.toTuple()),
	createdAt: zod.date(),
});

export const endpointUnprocessedAnswerDetails = zod.object({
	totalCount: zod.number(),
});
