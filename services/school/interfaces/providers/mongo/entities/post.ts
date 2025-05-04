import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string | null;
	nodeDocumentId: string;
	author: MongoUser;
	answerCount: number;
	createdAt: Date;
}
