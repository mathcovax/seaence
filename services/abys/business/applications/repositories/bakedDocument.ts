import { createRepositoryHandler, type RepositoryError, type RepositoryBase } from "@vendors/clean";
import { type BakedDocumentId, type BakedDocumentEntity, type BakedDocumentTitle, type BakedDocumentAbstract, type BakedDocumentKeyword, type BakedDocumentAbstractPart, type BakedDocumentRessource } from "@business/domains/entities/bakedDocument";
import { type RawAbstractPart, type RawAbstract, type RawTitle, type RawKeyword } from "@business/domains/common/rawDocument";
import { type NodeSameRawDocumentWrapper } from "./rawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";

export interface BakedDocumentRepository extends RepositoryBase<BakedDocumentEntity> {
	makeBakedTitleWithRawTitle(
		cookingMode: CookingMode,
		rawTitle: RawTitle,
		language: BakedDocumentLanguage
	): Promise<BakedDocumentTitle>;
	makeBakedAbstractWithRawAbstract(
		cookingMode: CookingMode,
		rawAbstract: RawAbstract,
		language: BakedDocumentLanguage
	): Promise<BakedDocumentAbstract>;
	makeBakedKeywordsWithKeywordPubmed(
		cookingMode: CookingMode,
		rawKeywordPubmed: RawKeyword[],
		language: BakedDocumentLanguage
	): Promise<BakedDocumentKeyword[]>;
	makeBakedAbstractDetailsWithRawAbstractDetails(
		cookingMode: CookingMode,
		rawAbstractDetails: RawAbstractPart[],
		language: BakedDocumentLanguage,
	): Promise<BakedDocumentAbstractPart[]>;
	makeBakedResourcesWithRawDocumentWrapper(
		rawDocumentWrapper: NodeSameRawDocumentWrapper
	): BakedDocumentRessource[];
	findUpdatedDocuments(): AsyncGenerator<BakedDocumentEntity>;
	findOneById(id: BakedDocumentId): Promise<BakedDocumentEntity | null>;
	findManyById(ids: BakedDocumentId[]): Promise<
		| BakedDocumentEntity[]
		| RepositoryError<
			"notfound-baked-document",
			{
				idsNotLinkToBakedDocument: BakedDocumentId[];
				foundBakedDocument: BakedDocumentEntity[];
			}
		>
	>;

}

export const bakedDocumentRepository = createRepositoryHandler<BakedDocumentRepository>();
