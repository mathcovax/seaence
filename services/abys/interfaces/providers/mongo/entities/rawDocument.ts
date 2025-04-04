import { type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoPubmedRawDocument extends EntityToSimpleObject<typeof PubmedRawDocumentEntity> {
	provider: "pubmed";
}

export type MongoRawDocument =
	| MongoPubmedRawDocument;
