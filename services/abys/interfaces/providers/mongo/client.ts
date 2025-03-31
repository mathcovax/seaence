import { createMongoClient, type MongoEntityType } from ".";
import { type PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { type ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
import { envs } from "@interfaces/envs";

interface PedroMongoEntity extends MongoEntityType<typeof PedroRawDocumentEntity> {}

interface PubmedMongoEntity extends MongoEntityType<typeof PubmedRawDocumentEntity> {}

interface ScienceDirectMongoEntity extends MongoEntityType<typeof ScienceDirectRawDocumentEntity> {}

const mongoClient = await createMongoClient(
	envs.MONGO_DB_URI,
	envs.MONGO_DB_NAME,
);

export const mongo = {
	pubmedEntity: mongoClient.collection<PubmedMongoEntity>("pubmed"),
	pedroEntity: mongoClient.collection<PedroMongoEntity>("pedro"),
	scienceDirectEntity: mongoClient.collection<ScienceDirectMongoEntity>("scienceDirect"),
};
