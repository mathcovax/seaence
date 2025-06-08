import { bakedDocumentTranslationReportingAggregateRepository } from "@business/applications/repositories/bakedDocumentTranslationReportingAggregate";
import { UsecaseHandler } from "@vendors/clean";

interface Input {

}

export class CountTotalBakedDocumentTranslationReportingAggregateUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingAggregateRepository,
}) {
	public execute(__: Input) {
		return this.bakedDocumentTranslationReportingAggregateRepository
			.countTotal();
	}
}
