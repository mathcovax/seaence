import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);

if (envs.DB_CONNECTION) {
	await client.connect();
}

export const mongo = {
	client,
	database,
};

