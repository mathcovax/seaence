import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type BakedDocumentId, type BakedDocumentEntity, type BakedDocumentTitle, type BakedDocumentAbstract, type BakedDocumentKeyword, type BakedDocumentAbstractPart, type BakedDocumentRessource } from "@business/domains/entities/bakedDocument";
import { type RawAbstractPart, type RawAbstract, type RawTitle, type RawKeyword } from "@business/domains/common/rawDocument";
import { type NodeSameRawDocumentWrapper } from "./rawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";

export interface BakedDocumentRepository extends RepositoryBase<BakedDocumentEntity> {
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
	makeBakedResourcesWithRawDocumentWrapper(
		rawDocumentWrapper: NodeSameRawDocumentWrapper
	): BakedDocumentRessource[];
	findUpdatedDocuments(): AsyncGenerator<BakedDocumentEntity>;
	findOneById(id: BakedDocumentId): Promise<BakedDocumentEntity | null>;
	findManyById(ids: BakedDocumentId[]): Promise<BakedDocumentEntity[]>;

}

export const bakedDocumentRepository = createRepositoryHandler<BakedDocumentRepository>();
