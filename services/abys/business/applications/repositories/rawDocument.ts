import { type Provider } from "@business/domains/common/provider";
import { type RawResourceUrl } from "@business/domains/common/rawDocument";
import { type UniqueField } from "@business/domains/common/uniqueField";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type ExpectType } from "@duplojs/utils";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type RawDocumentEntity = PubmedRawDocumentEntity;

export interface ResultOfFindByNodeSameRawDocument {
	pubmed?: PubmedRawDocumentEntity;
}

type _AssertResultOfFindByNodeSameRawDocument = ExpectType<
	Provider["value"],
	keyof ResultOfFindByNodeSameRawDocument,
	"strict"
>;

export interface RawDocumentRepository extends RepositoryBase<RawDocumentEntity> {
	findByResourceUrl(resourceUrl: RawResourceUrl): Promise<RawDocumentEntity | null>;
	findUniqueField(field: RawDocumentEntity): UniqueField;
	findByNodeSameRawDocument(NodeSameRawDocumentEntity: NodeSameRawDocumentEntity): ResultOfFindByNodeSameRawDocument;
}

export const rawDocumentRepository = createRepositoryHandler<RawDocumentRepository>();
