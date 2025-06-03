import { type NodeSameRawDocumentId, type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

type RawDocumentEntity = PubmedRawDocumentEntity;

interface FindNodeSameRawDocumentPerPageOptions {
	page: Int;
	quantityPerPage: Int;
}

export interface NodeSameRawDocumentRepository extends RepositoryBase<NodeSameRawDocumentEntity> {
	findNodeSameRawDocumentbyRawDocument(rawDocument: RawDocumentEntity): Promise<NodeSameRawDocumentEntity | null>;
	generateNodeSameRawDocumentId(): NodeSameRawDocumentId;
	findNodeSameRawDocumentPerPage(
		options: FindNodeSameRawDocumentPerPageOptions
	): Promise<NodeSameRawDocumentEntity[]>;
	findUpdatedNode(): AsyncGenerator<NodeSameRawDocumentEntity>;
	findOneById(id: NodeSameRawDocumentId): Promise<NodeSameRawDocumentEntity | null>;
}

export const nodeSameRawDocumentRepository = createRepositoryHandler<NodeSameRawDocumentRepository>();
