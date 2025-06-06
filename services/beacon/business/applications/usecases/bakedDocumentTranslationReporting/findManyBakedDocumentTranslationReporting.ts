import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type Int, UsecaseHandler } from "@vendors/clean";

interface Input {
	page: Int;
	quantityPerPage: Int;
	bakedDocumentId: BakedDocumentId;
}

export class FindManyBakedDocumentTranslationReportingUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingRepository,
}) {
	public execute({ page, quantityPerPage, bakedDocumentId }: Input) {
		return this.bakedDocumentTranslationReportingRepository
			.findMany({
				page,
				quantityPerPage,
				bakedDocumentId,
			});
	}
}
