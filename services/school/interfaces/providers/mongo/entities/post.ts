import { type MongoArticle } from "./article";
import { type MongoUser } from "./user";

export interface MongoPost {
	id: string;
	topic: string;
	content: string;
	article: MongoArticle;
	author: MongoUser;
}
