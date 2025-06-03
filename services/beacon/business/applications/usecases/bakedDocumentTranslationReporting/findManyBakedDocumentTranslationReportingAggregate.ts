import { bakedDocumentTranslationReportingAggregateRepository } from "@business/applications/repositories/bakedDocumentTranslationReportingAggregate";
import { type Int, UsecaseHandler } from "@vendors/clean";

interface Input {
	page: Int;
	quantityPerPage: Int;
}

export class FindManyBakedDocumentTranslationReportingAggregateUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingAggregateRepository,
}) {
	public execute({ page, quantityPerPage }: Input) {
		return this.bakedDocumentTranslationReportingAggregateRepository
			.findMany({
				page,
				quantityPerPage,
			});
	}
}
