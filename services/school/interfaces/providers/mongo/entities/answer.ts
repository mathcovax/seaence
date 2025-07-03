import { type AnswerStatusEnum } from "@business/domains/entities/answer";

export interface MongoAnswer {
	id: string;
	postId: string;
	content: string;
	authorId: string;
	authorName: string;
	status: AnswerStatusEnum;
	createdAt: Date;
}

