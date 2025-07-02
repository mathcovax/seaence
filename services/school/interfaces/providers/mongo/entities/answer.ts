import { type AnswerStatus } from "@business/domains/entities/answer";

export interface MongoAnswer {
	id: string;
	postId: string;
	content: string;
	authorId: string;
	authorName: string;
	status: AnswerStatus["value"];
	createdAt: Date;
}

