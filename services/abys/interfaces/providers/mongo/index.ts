import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoRawDocument } from "./entities/rawDocument";
import { type MongoNodeSameRawDocument } from "./entities/nodeSameRawDocument";
import { type MongoBakedDocument } from "./entities/bakedDocument";
import { type MongoKeyDate } from "./entities/keyDate";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);
const rawDocumentCollection = database.collection<MongoRawDocument>("rawDocument");
const nodeNameRawDocumentCollection = database.collection<MongoNodeSameRawDocument>("nodeSameRawDocument");
const bakedDocumentCollection = database.collection<MongoBakedDocument>("bakedDocument");
const keyDateCollection = database.collection<MongoKeyDate>("keyDate");

if (envs.DB_CONNECTION) {
	await client.connect();
	await Promise.all([
		bakedDocumentCollection.createIndex({
			lastUpdate: 1,
			id: 1,
		}),
	]);
}

export const mongo = {
	client,
	database,
	rawDocumentCollection,
	nodeNameRawDocumentCollection,
	bakedDocumentCollection,
	keyDateCollection,
};

