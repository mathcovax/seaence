import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type UserId } from "@business/domains/common/user";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	userId: UserId;
	bakedDocumentId: BakedDocumentId;
}

export class FindBakedDocumentTranslationReportingUsecase extends UsecaseHandler.create({
	bakedDocumentTranslationReportingRepository,
}) {
	public execute({ userId, bakedDocumentId }: Input) {
		return this.bakedDocumentTranslationReportingRepository
			.find(userId, bakedDocumentId);
	}
}
