import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type MongoPost } from "./entities/post";
import { type MongoAnswer } from "./entities/answer";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB, { ignoreUndefined: true });
const postCollection = database.collection<MongoPost>("posts");
const answerCollection = database.collection<MongoAnswer>("answers");

if (envs.DB_CONNECTION) {
	await client.connect();
	await Promise.all([
		postCollection.createIndex({ answerCount: 1 }),
		answerCollection.createIndex({ createdAt: 1 }),
	]);
}

export const mongo = {
	client,
	database,
	postCollection,
	answerCollection,
};
