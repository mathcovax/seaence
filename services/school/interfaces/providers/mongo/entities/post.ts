import { type PostStatus } from "@business/domains/entities/post";
import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string;
	nodeSameRawDocumentId: string;
	author: MongoUser;
	answerCount: number;
	status: PostStatus["value"];
	createdAt: Date;
}
