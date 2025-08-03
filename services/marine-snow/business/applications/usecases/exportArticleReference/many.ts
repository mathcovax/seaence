import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { exportArticleReferenceMissionRepository } from "@business/applications/repositories/exportArticleReferenceMission";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { ExportManyArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/many";
import { arrayIsNotEmpty, type Int, UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	concurrency: Int;
}

export class ExportManyArticleReferenceUsecase extends UsecaseHandler.create({
	exportArticleReferenceMissionRepository,
	scienceDatabaseRepository,
	articleReferenceRepository,
}) {
	public async execute({ concurrency }: Input) {
		let mission = await this
			.exportArticleReferenceMissionRepository
			.save(
				ExportManyArticleReferenceMissionEntity.create({
					id: this
						.exportArticleReferenceMissionRepository
						.generateId(),
					concurrency,
				}),
			);

		for await (const references of this.articleReferenceRepository.foreach(concurrency)) {
			const {
				successExportArticleReferences,
				failedExportArticleReferences,
			} = await this
				.scienceDatabaseRepository
				.exportArticleReferences(references);

			if (arrayIsNotEmpty(successExportArticleReferences)) {
				await this
					.articleReferenceRepository
					.deleteMany(successExportArticleReferences);

				mission = await this.exportArticleReferenceMissionRepository.save(
					mission.processArticleReferences(successExportArticleReferences),
				);
			}

			if (arrayIsNotEmpty(failedExportArticleReferences)) {
				const failedArticleReference = await Promise.all(
					failedExportArticleReferences
						.map(({ moreData: { articleReference } }) => articleReference)
						.map(
							(articleReference) => this
								.articleReferenceRepository
								.save(articleReference.failed()),
						),
				);

				const failedMission = await this
					.exportArticleReferenceMissionRepository
					.save(mission.failed(failedArticleReference));

				return new UsecaseError("failed-to-export-many-article-references", {
					failedExportArticleReferences,
					failedMission,
				});
			}
		}

		return this
			.exportArticleReferenceMissionRepository
			.save(
				mission.success(),
			);
	}
}
