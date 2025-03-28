import { envs } from "@interfaces/envs";
import { createMongoDBClient } from ".";

export const mongoClient = await createMongoDBClient(
	envs.MONGO_DB_URI,
	envs.MONGO_DB_NAME,
);
