import { type PostStatus } from "@business/domains/entities/post";

export interface MongoPost {
	id: string;
	topic: string;
	content: string;
	nodeSameRawDocumentId: string;
	authorId: string;
	authorName: string | null;
	answerCount: number;
	status: PostStatus["value"];
	createdAt: Date;
}
