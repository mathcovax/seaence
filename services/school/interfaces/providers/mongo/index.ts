import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type MongoPost } from "./entities/post";
import { type MongoAnswer } from "./entities/answer";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

if (envs.DB_CONNECTION) {
	await client.connect();
}

const database = client.db(envs.MONGO_DB_NAME);
const postCollection = database.collection<MongoPost>("posts");
const answerCollection = database.collection<MongoAnswer>("answers");

export const mongo = {
	client,
	database,
	postCollection,
	answerCollection,
};
