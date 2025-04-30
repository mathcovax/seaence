import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoRawDocument } from "./entities/rawDocument";
import { type MongoNodeSameRawDocument } from "./entities/nodeSameRawDocument";
import { type MongoBakedDocument } from "./entities/bakedDocument";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

if (envs.DB_CONNECTION) {
	await client.connect();
}

const database = client.db(envs.MONGO_DB);
const rawDocumentCollection = database.collection<MongoRawDocument>("rawDocument");
const nodeNameRawDocumentCollection = database.collection<MongoNodeSameRawDocument>("nodeSameRawDocument");
const bakedDocumentCollection = database.collection<MongoBakedDocument>("bakedDocument");

export const mongo = {
	client,
	database,
	rawDocumentCollection,
	nodeNameRawDocumentCollection,
	bakedDocumentCollection,
};

