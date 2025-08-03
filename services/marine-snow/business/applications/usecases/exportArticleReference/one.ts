import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { exportArticleReferenceMissionRepository } from "@business/applications/repositories/exportArticleReferenceMission";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { type ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { ExportOneArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/one";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	articleReference: ArticleReferenceEntity;
}

export class ExportOneArticleReferenceUsecase extends UsecaseHandler.create({
	exportArticleReferenceMissionRepository,
	scienceDatabaseRepository,
	articleReferenceRepository,
}) {
	public async execute({ articleReference }: Input) {
		const mission = await this.exportArticleReferenceMissionRepository.save(
			ExportOneArticleReferenceMissionEntity.create({
				id: this
					.exportArticleReferenceMissionRepository
					.generateId(),
				provider: articleReference.provider,
				referenceValue: articleReference.value,
			}),
		);

		const { failedExportArticleReferences: [error] } = await this.scienceDatabaseRepository.exportArticleReferences(
			[articleReference],
		);

		if (error) {
			await this.articleReferenceRepository.save(
				articleReference.failed(),
			);
			const failedMission = await this
				.exportArticleReferenceMissionRepository
				.save(
					mission.failed(),
				);

			return new UsecaseError("failed-to-send-one-article-reference", {
				error,
				failedMission,
			});
		}

		await this.articleReferenceRepository.delete(articleReference);

		return this
			.exportArticleReferenceMissionRepository
			.save(
				mission.success(),
			);
	}
}
