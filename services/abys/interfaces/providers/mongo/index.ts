import { type EntityToSimpleObject } from "@vendors/clean";
import { MongoClient } from "mongodb";
// entities
import { type PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { type ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
// others
import { envs } from "@interfaces/envs";

type RawDocumentMongoEntity = (
	| (EntityToSimpleObject<typeof PedroRawDocumentEntity> & { source: "Pedro" })
	| (EntityToSimpleObject<typeof PubmedRawDocumentEntity> & { source: "Pubmed" })
	| (EntityToSimpleObject<typeof ScienceDirectRawDocumentEntity> & { source: "ScienceDirect" })
);

const client = new MongoClient(envs.MONGO_DATABASE_URL);
await client.connect();
const db = client.db(envs.MONGO_DB);

const mongo = {
	db,
	rawDocumentEntity: db.collection<RawDocumentMongoEntity>("rawDocument"),
};

export {
	mongo,
	RawDocumentMongoEntity,
};
