import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type MongoPost } from "./entities/post";
import { type MongoAnswer } from "./entities/answer";

const mongoClient = new MongoClient(envs.MONGO_DATABASE_URL);

await mongoClient.connect();

const mongodb = mongoClient.db(envs.MONGO_DB_NAME);
const postCollection = mongodb.collection<MongoPost>("posts");
const answerCollection = mongodb.collection<MongoAnswer>("answers");

export const mongo = {
	mongodb,
	postCollection,
	answerCollection,
};
