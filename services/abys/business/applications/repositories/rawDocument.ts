import { type PubmedRawDocumentResourceUrl, type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type RawDocumentEntity = PubmedRawDocumentEntity;

export interface RawDocumentRepository extends RepositoryBase<RawDocumentEntity> {
	findByResourceUrl(resourceUrl: PubmedRawDocumentResourceUrl): Promise<RawDocumentEntity | null>;
}

export const rawDocumentRepository = createRepositoryHandler<RawDocumentRepository>();

