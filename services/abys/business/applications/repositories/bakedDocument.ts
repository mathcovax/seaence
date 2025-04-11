import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type BakedDocumentId, type BakedDocumentEntity, type BakedDocumentTitle, type BakedDocumentLanguage, type BakedDocumentAbstract, type BakedDocumentKeyword, type BakedDocumentAbstractDetails } from "@business/domains/entities/bakedDocument";
import { type RawAbstractPart, type RawAbstract, type RawTitle } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentKeyword } from "@business/domains/entities/rawDocument/pubmed";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";

export interface BakedDocumentRepository extends RepositoryBase<BakedDocumentEntity> {
	generateBakedDocumentId(): BakedDocumentId;
	makeBakedTitleWithRawTitle(rawTitle: RawTitle, language: BakedDocumentLanguage): Promise<BakedDocumentTitle>;
	makeBakedAbstractWithRawAbstract(
		rawAbstract: RawAbstract,
		language: BakedDocumentLanguage
	): Promise<BakedDocumentAbstract>;
	makeBakedKeywordsWithKeywordPubmed(
		rawKeywordPubmed: PubmedRawDocumentKeyword[],
		language: BakedDocumentLanguage
	): Promise<BakedDocumentKeyword[]>;
	makeBakedAbstractDetailsWithRawAbstractDetails(
		rawAbstractDetails: RawAbstractPart[],
		language: BakedDocumentLanguage,
	): Promise<BakedDocumentAbstractDetails>;
	findByNodeSameRawDocument(nodeSameRawDocument: NodeSameRawDocumentEntity): Promise<BakedDocumentEntity | null>;
}

export const bakedDocumentRepository = createRepositoryHandler<BakedDocumentRepository>();
