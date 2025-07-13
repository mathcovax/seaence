import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocument";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { type NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { type BakedDocumentTranslationReportingAggregateEntity } from "@business/domains/entities/bakedDocumentTranslationReportingAggregate";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	bakedDocumentTranslationReportingAggregate: BakedDocumentTranslationReportingAggregateEntity;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	cookingMode: CookingMode;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

export class ProcessesBakedDocumentTranslationReportingAggregateUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingRepository,
	bakedDocumentRepository,
}) {
	public execute(
		{
			bakedDocumentTranslationReportingAggregate,
			...restInput
		}: Input,
	) {
		return Promise.all([
			this.bakedDocumentTranslationReportingRepository.deleteMany(
				bakedDocumentTranslationReportingAggregate.bakedDocumentId,
			),
			this.bakedDocumentRepository.updateTranslation(restInput),
		]);
	}
}
