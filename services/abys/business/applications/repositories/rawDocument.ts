import { type Provider } from "@business/domains/common/provider";
import { type RawResourceUrl } from "@business/domains/common/rawDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type ExpectType } from "@duplojs/utils";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type RawDocument =
	| PubmedRawDocumentEntity;

export interface NodeSameRawDocumentWrapper {
	pubmed?: PubmedRawDocumentEntity;
}

type _AssertResultOfFindByNodeSameRawDocument = ExpectType<
	Provider["value"],
	keyof NodeSameRawDocumentWrapper,
	"strict"
>;

export interface RawDocumentRepository extends RepositoryBase<RawDocument> {
	findByResourceUrl(resourceUrl: RawResourceUrl): Promise<RawDocument | null>;
	findByNodeSameRawDocument(
		NodeSameRawDocumentEntity: NodeSameRawDocumentEntity
	): Promise<NodeSameRawDocumentWrapper>;
}

export const rawDocumentRepository = createRepositoryHandler<RawDocumentRepository>();
