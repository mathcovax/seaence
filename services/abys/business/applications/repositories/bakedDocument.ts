import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type BakedDocumentId, type BakedDocumentEntity, type BakedDocumentTitle, type BakedDocumentLanguage, type BakedDocumentAbstract, type BakedDocumentKeyword, type BakedDocumentAbstractDetails } from "@business/domains/entities/bakedDocument";
import { type RawAbstractPart, type RawAbstract, type RawTitle } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentKeyword } from "@business/domains/entities/rawDocument/pubmed";

export interface BakedDocumentRepository extends RepositoryBase<BakedDocumentEntity> {
	generateBakedDocumentId(): BakedDocumentId;
	makeBakedTitleWithRawTitle(rawTitle: RawTitle, language: BakedDocumentLanguage): BakedDocumentTitle;
	makeBakedAbstractWithRawAbstract(rawAbstract: RawAbstract, language: BakedDocumentLanguage): BakedDocumentAbstract;
	makeBakedKeywordsWithKeywordPubmed(
		rawKeywordPubmed: PubmedRawDocumentKeyword[],
		language: BakedDocumentLanguage
	): BakedDocumentKeyword[];
	makeBakedAbstractDetailsWithRawAbstractDetails(
		rawAbstractDetails: RawAbstractPart[],
		language: BakedDocumentLanguage,
	): BakedDocumentAbstractDetails;
}

export const bakedDocumentRepository = createRepositoryHandler<BakedDocumentRepository>();
