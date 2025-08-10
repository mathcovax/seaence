import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { providerObjecter } from "@business/domains/common/provider";
import { ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { type PubmedFetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission/pubmed";
import { dateYYYYMMDDIntervalObjecter, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartFetchArticleReferenceMissionUsecase } from "../start";

interface Input {
	mission: PubmedFetchArticleReferenceMissionEntity;
}

export class FetchPubmedArticleReferencesUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
	scienceDatabaseRepository,
	articleReferenceRepository,
	startMission: StartFetchArticleReferenceMissionUsecase,
}) {
	public async execute({ mission }: Input) {
		let startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		const interval = dateYYYYMMDDIntervalObjecter
			.unsafeCreate({
				from: startedMission.currentStep.value.date,
				to: startedMission.interval.value.to,
			});

		for await (
			const result of this
				.scienceDatabaseRepository
				.fetchPubmedArticleReferences(mission.articleType, interval)
		) {
			const { date, page } = result;

			startedMission = await this.fetchArticleReferenceMissionRepository.save(
				startedMission.updateStep(date, page),
			);

			if (result.success === false) {
				const { error } = result;

				const failedMission = await this
					.fetchArticleReferenceMissionRepository
					.save(
						startedMission.failed(),
					);

				return new UsecaseError(
					"failed-fetch-pubmed-article-references",
					{
						error,
						failedMission,
					},
				);
			} else {
				const { references } = result;

				await Promise.all(
					references.map(
						(value) => this
							.articleReferenceRepository
							.save(
								ArticleReferenceEntity
									.create({
										provider: providerObjecter.unsafeCreate("pubmed"),
										value,
									}),
							),
					),
				);
			}
		}

		return this
			.fetchArticleReferenceMissionRepository
			.save(
				startedMission.success(),
			);
	}
}
