import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
// entities
import { type PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { type PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { type ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
// types
import { type Url, type DateInterval } from "@business/domains/types/common";
import { type DocumentId } from "@business/domains/types/raw/document";

type RawDocumentEntity = PubmedRawDocumentEntity | ScienceDirectRawDocumentEntity | PedroRawDocumentEntity;

interface RawDocumentRepository extends RepositoryBase<RawDocumentEntity> {
	generateRawDocumentId(): DocumentId;

	findByDateInterval(dateInterval: DateInterval): Promise<RawDocumentEntity[]>;

	findByDocumentId(documentId: DocumentId): Promise<RawDocumentEntity | null>;

	findBySourceUrl(sourceUrl: Url): Promise<RawDocumentEntity | null>;
}

const rawDocumentRepository = createRepositoryHandler<RawDocumentRepository>();

export {
	rawDocumentRepository,
	RawDocumentRepository,
	RawDocumentEntity,
};
