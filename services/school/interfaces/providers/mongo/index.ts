import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type Post } from "./entities/post";
import { type Answer } from "./entities/answer";
import { type Article } from "./entities/article";
import { type User } from "./entities/user";

const mongoClient = new MongoClient(envs.MONGO_DATABASE_URL);

await mongoClient.connect();

const mongodb = mongoClient.db(envs.MONGO_DB_NAME);
const postCollection = mongodb.collection<Post>("posts");
const answerCollection = mongodb.collection<Answer>("answers");
const articleCollection = mongodb.collection<Article>("articles");
const userCollection = mongodb.collection<User>("users");

export const mongo = {
	mongodb,
	postCollection,
	answerCollection,
	articleCollection,
	userCollection,
};
