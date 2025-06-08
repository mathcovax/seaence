import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	bakedDocumentId: BakedDocumentId;
}

export class DeleteManyBakedDocumentTranslationReportingUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingRepository,
}) {
	public execute({ bakedDocumentId }: Input) {
		return this.bakedDocumentTranslationReportingRepository
			.deleteMany(bakedDocumentId);
	}
}
