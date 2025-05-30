import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/common/user";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type ReportingDetails } from "@business/domains/entities/reporting";
import { BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { FindBakedDocumentTranslationReportingUsecase } from "./findBakedDocumentTranslationReporting";
import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { reportingRepository } from "@business/applications/repositories/reporting";

interface Input {
	userId: UserId;
	bakedDocumentId: BakedDocumentId;
	reportingDetails: ReportingDetails;
}

export class CreateBakedDocumentTranslationReportingUsecase extends UsecaseHandler.create({
	reportingRepository,
	bakedDocumentTranslationReportingRepository,
	findBakedDocumentTranslationReportingUsecase: FindBakedDocumentTranslationReportingUsecase,
}) {
	public async execute({ userId, bakedDocumentId, reportingDetails }: Input) {
		const findedReporting = await this.findBakedDocumentTranslationReportingUsecase({
			userId,
			bakedDocumentId,
		});

		if (findedReporting !== null) {
			return new UsecaseError("reporting-already-exist", { findedReporting });
		}

		return this.bakedDocumentTranslationReportingRepository.save(
			BakedDocumentTranslationReportingEntity
				.create({
					id: this.reportingRepository.generateId(),
					userId,
					bakedDocumentId,
					details: reportingDetails,
				}),
		);
	}
}
