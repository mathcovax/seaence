import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoRawDocument } from "./entities/rawDocument";
import { type MongoNodeSameRawDocument } from "./entities/nodeSameRawDocument";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

if (envs.DB_CONNECTION) {
	await client.connect();
}

const mongodb = client.db(envs.MONGO_DB);
const rawDocumentCollection = mongodb.collection<MongoRawDocument>("rawDocument");
const nodeNameRawDocumentCollection = mongodb.collection<MongoNodeSameRawDocument>("nodeSameRawDocument");

export const mongo = {
	mongodb,
	rawDocumentCollection,
	nodeNameRawDocumentCollection,
};

