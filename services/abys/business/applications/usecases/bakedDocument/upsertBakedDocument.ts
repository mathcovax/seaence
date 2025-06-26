import { type FlexibleDate, UsecaseHandler } from "@vendors/clean";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type NodeSameRawDocumentId } from "@business/domains/entities/nodeSameRawDocument";
import type * as BakedDocument from "@business/domains/entities/bakedDocument";
import { type ArticleType } from "@business/domains/common/articleType";
import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type CookingMode } from "@business/domains/common/cookingMode";

interface Input {
	cookingMode: CookingMode;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	language: BakedDocumentLanguage;
	articleTypes: ArticleType[];
	authors: BakedDocument.BakedDocumentAuthor[];
	title: BakedDocument.BakedDocumentTitle;
	abstract: BakedDocument.BakedDocumentAbstract | null;
	abstractDetails: BakedDocument.BakedDocumentAbstractPart[] | null;
	resources: BakedDocument.BakedDocumentRessource[];
	keywords: BakedDocument.BakedDocumentKeyword[];
	journalPublishDate: FlexibleDate | null;
	webPublishDate: FlexibleDate | null;
}

export class UpsertBakedDocumentUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
}) {
	public execute(
		{
			nodeSameRawDocumentId,
			language,
			articleTypes,
			authors,
			title,
			abstract,
			abstractDetails,
			resources,
			keywords,
			journalPublishDate,
			webPublishDate,
			cookingMode,
		}: Input,
	) {
		return this.bakedDocumentRepository.save(
			BakedDocumentEntity.create({
				cookingMode,
				nodeSameRawDocumentId,
				language,
				articleTypes,
				authors,
				title,
				abstract,
				abstractDetails,
				resources,
				keywords,
				journalPublishDate,
				webPublishDate,
			}),
		);
	}
}
