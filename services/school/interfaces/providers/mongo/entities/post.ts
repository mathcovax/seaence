import { type MongoDocument } from "./document";
import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string | null;
	document: MongoDocument;
	author: MongoUser;
	answerCount: number;
	createdAt: Date;
}
