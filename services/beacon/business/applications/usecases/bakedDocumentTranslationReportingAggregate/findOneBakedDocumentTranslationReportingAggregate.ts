import { bakedDocumentTranslationReportingAggregateRepository } from "@business/applications/repositories/bakedDocumentTranslationReportingAggregate";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	bakedDocumentId: BakedDocumentId;
}

export class FindOneBakedDocumentTranslationReportingAggregateUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingAggregateRepository,
}) {
	public execute({ bakedDocumentId }: Input) {
		return this.bakedDocumentTranslationReportingAggregateRepository.findOne(bakedDocumentId);
	}
}
