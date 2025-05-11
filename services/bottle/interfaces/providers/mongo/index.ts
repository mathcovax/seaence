import { MongoClient } from "mongodb";
import { envs } from "@interfaces/envs";
import { type MongoNotification } from "./entities/notification";
import { type MongoUser } from "./entities/user";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

if (envs.DB_CONNECTION) {
	await client.connect();
}

const database = client.db(envs.MONGO_DB);
const notificationCollection = database.collection<MongoNotification>("notification");
const userCollection = database.collection<MongoUser>("user");

export const mongo = {
	client,
	database,
	notificationCollection,
	userCollection,
};
