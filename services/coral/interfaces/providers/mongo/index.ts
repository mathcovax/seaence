import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoDocumentFolder } from "./entities/documentFolder";
import { type MongoFavoriEquation } from "./entities/favoriEquation";
import { type MongoDocumentInFolder } from "./entities/documentinFolder";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);
const documentFolder = database.collection<MongoDocumentFolder>("documentFolder");
const documentInFolder = database.collection<MongoDocumentInFolder>("documentInFolder");
const favoriEquation = database.collection<MongoFavoriEquation>("favoriEquation");

if (envs.DB_CONNECTION) {
	await client.connect();
}

export const mongo = {
	client,
	database,
	documentInFolder,
	documentFolder,
	favoriEquation,
};

