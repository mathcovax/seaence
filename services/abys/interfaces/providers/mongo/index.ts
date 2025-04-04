import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoRawDocument } from "./entities/rawDocument";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

if (envs.DB_CONNECTION) {
	await client.connect();
}

const mongodb = client.db(envs.MONGO_DB);
const rawDocumentCollection = mongodb.collection<MongoRawDocument>("rawDocument");

export const mongo = {
	mongodb,
	rawDocumentCollection,
};

