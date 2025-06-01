import { UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/common/user";
import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type ReportingDetails } from "@business/domains/entities/reporting";
import { BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { reportingRepository } from "@business/applications/repositories/reporting";
import { match, P } from "ts-pattern";

interface Input {
	userId: UserId;
	bakedDocumentId: BakedDocumentId;
	reportingDetails: ReportingDetails;
}

export class UpsertBakedDocumentTranslationReportingUsecase extends UsecaseHandler.create({
	reportingRepository,
	bakedDocumentTranslationReportingRepository,
}) {
	public async execute({ userId, bakedDocumentId, reportingDetails }: Input) {
		const findedReporting = await this.bakedDocumentTranslationReportingRepository
			.find(userId, bakedDocumentId);

		const bakedDocumentTranslationReporting = match({ findedReporting })
			.with(
				{ findedReporting: null },
				() => BakedDocumentTranslationReportingEntity.create({
					id: this.reportingRepository.generateId(),
					userId,
					bakedDocumentId,
					details: reportingDetails,
				}),
			)
			.with(
				{ findedReporting: P.instanceOf(BakedDocumentTranslationReportingEntity) },
				({ findedReporting }) => findedReporting.updateDetails(reportingDetails),
			)
			.exhaustive();

		return this.bakedDocumentTranslationReportingRepository.save(
			bakedDocumentTranslationReporting,
		);
	}
}
