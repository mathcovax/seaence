import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoDocumentFolder } from "./entities/documentFolder";
import { type MongoFavoriteEquation } from "./entities/favoriteEquation";
import { type MongoDocumentInFolder } from "./entities/documentinFolder";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);
const documentFolder = database.collection<MongoDocumentFolder>("documentFolder");
const documentInFolder = database.collection<MongoDocumentInFolder>("documentInFolder");
const favoriteEquation = database.collection<MongoFavoriteEquation>("favoriteEquation");

if (envs.DB_CONNECTION) {
	await client.connect();
	await Promise.all([
		documentInFolder.createIndex({
			nodeSameRawDocumentId: 1,
			userId: 1,
		}),
		documentFolder.createIndex({
			id: 1,
			addedAt: -1,
			userId: 1,
		}),
	]);
}

export const mongo = {
	client,
	database,
	documentInFolder,
	documentFolder,
	favoriteEquation,
};

