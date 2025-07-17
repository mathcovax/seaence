import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type BakedDocumentTranslationReportingMongo } from "./entities/bakedDocumentTranslationReporting";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB, { ignoreUndefined: true });

const bakedDocumentTranslationReportingCollection = database.collection<
	BakedDocumentTranslationReportingMongo
>("bakedDocumentTranslationReporting");

if (envs.DB_CONNECTION) {
	await client.connect();
}

export const mongo = {
	client,
	database,
	bakedDocumentTranslationReportingCollection,
};
