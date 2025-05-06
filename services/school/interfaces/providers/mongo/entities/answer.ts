import { type MongoUser } from "./user";
export interface MongoAnswer {
	id: string;
	postId: string;
	content: string;
	author: MongoUser;
	createdAt: Date;
}

