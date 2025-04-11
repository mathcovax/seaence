import { type NodeSameRawDocumentId, type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { type PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

type RawDocumentEntity = PubmedRawDocumentEntity;

export interface NodeSameRawDocumentRepository extends RepositoryBase<NodeSameRawDocumentEntity> {
	findNodeSameRawDocumentbyRawDocument(rawDocument: RawDocumentEntity): Promise<NodeSameRawDocumentEntity | null>;
	generateNodeSameRawDocumentId(): NodeSameRawDocumentId;
}

export const nodeSameRawDocumentRepository = createRepositoryHandler<NodeSameRawDocumentRepository>();
