import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { exportArticleReferenceMissionRepository } from "@business/applications/repositories/exportArticleReferenceMission";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { ExportManyArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/many";
import { type Int, useAsyncLoop, UsecaseError, UsecaseHandler } from "@vendors/clean";

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

		return useAsyncLoop(
			async({ next, exit }) => {
				const references = await this
					.articleReferenceRepository
					.findTheFirstOnes(concurrency, { ignoreFailded: true });

				if (!references.length) {
					return exit(
						await this
							.exportArticleReferenceMissionRepository
							.save(
								mission.success(),
							),
					);
				}

				const {
					successExportArticleReferences,
					failedExportArticleReferences,
				} = await this
					.scienceDatabaseRepository
					.exportArticleReferences(references);

				if (successExportArticleReferences.length) {
					mission = await this.exportArticleReferenceMissionRepository.save(
						mission.processArticleReferences(successExportArticleReferences),
					);

					await Promise.all(
						successExportArticleReferences.map(
							(articleReferences) => this
								.articleReferenceRepository
								.delete(articleReferences),
						),
					);
				}

				if (failedExportArticleReferences.length) {
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

					return exit(
						new UsecaseError("failed-to-export-many-article-references", {
							failedExportArticleReferences,
							failedMission,
						}),
					);
				}

				return next();
			},
		);
	}
}
