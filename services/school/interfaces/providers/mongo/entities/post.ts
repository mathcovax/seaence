import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string | null;
	nodeSameRawDocumentId: string;
	author: MongoUser;
	answerCount: number;
	createdAt: Date;
}
