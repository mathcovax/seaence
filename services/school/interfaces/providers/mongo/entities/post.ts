import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string;
	nodeSameRawDocumentId: string;
	author: MongoUser;
	answerCount: number;
	createdAt: Date;
}
