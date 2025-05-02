import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type BakedDocumentId, type BakedDocumentEntity, type BakedDocumentTitle, type BakedDocumentLanguage, type BakedDocumentAbstract, type BakedDocumentKeyword, type BakedDocumentAbstractPart, type BakedDocumentRessource } from "@business/domains/entities/bakedDocument";
import { type RawAbstractPart, type RawAbstract, type RawTitle, type RawKeyword } from "@business/domains/common/rawDocument";
import { type NodeSameRawDocumentId } from "@business/domains/entities/nodeSameRawDocument";
import { type RawDocument } from "./rawDocument";

export interface BakedDocumentRepository extends RepositoryBase<BakedDocumentEntity> {
	makeBakedDocumentId(
		language: BakedDocumentLanguage,
		nodeSameRawDocumentId: NodeSameRawDocumentId
	): BakedDocumentId;
	makeBakedTitleWithRawTitle(rawTitle: RawTitle, language: BakedDocumentLanguage): Promise<BakedDocumentTitle>;
	makeBakedAbstractWithRawAbstract(
		rawAbstract: RawAbstract,
		language: BakedDocumentLanguage
	): Promise<BakedDocumentAbstract>;
	makeBakedKeywordsWithKeywordPubmed(
		rawKeywordPubmed: RawKeyword[],
		language: BakedDocumentLanguage
	): Promise<BakedDocumentKeyword[]>;
	makeBakedAbstractDetailsWithRawAbstractDetails(
		rawAbstractDetails: RawAbstractPart[],
		language: BakedDocumentLanguage,
	): Promise<BakedDocumentAbstractPart[]>;
	findUpdatedDocuments(): AsyncGenerator<BakedDocumentEntity>;
	findDOIFoundationResourcesInRawDocument(rawDocument: RawDocument): BakedDocumentRessource | null;
}

export const bakedDocumentRepository = createRepositoryHandler<BakedDocumentRepository>();
