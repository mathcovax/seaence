import { type AnswerStatusEnum } from "@business/domains/entities/answer";

export interface MongoAnswer {
	id: string;
	postId: string;
	content: string;
	authorId: string;
	authorName: string | null;
	status: AnswerStatusEnum;
	createdAt: Date;
}

