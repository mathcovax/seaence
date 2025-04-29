import { type SearchResultMission, scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SupportedSearchResultMission } from "@interfaces/workers/missions/searchResult";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { match, P } from "ts-pattern";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { PubMedSearchResultMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { startWorkerMission } from "@interfaces/workers";
import { TechnicalError } from "@vendors/clean/error";
import { prismaClient } from "@interfaces/providers/prisma";

scienceDatabaseRepository.default = {
	save() {
		throw new TechnicalError("Unsupport save method");
	},

	async *startSearchResultMission(mission) {
		const missionData: SupportedSearchResultMission
			= await match({ mission: mission as SearchResultMission })
				.with(
					{ mission: P.instanceOf(PubMedSearchResultMissionEntity) },
					async({ mission }) => {
						const step = await prismaClient.searchResultPubMedMissionStep.findFirst({
							where: { missionId: mission.id.value },
						});

						const simpleEntity = mission.toSimpleObject();

						return {
							provider: "pubmed",
							missionName: "searchResult",
							...simpleEntity,
							interval: step
								? {
									from: step.date,
									to: simpleEntity.interval.to,
								}
								: simpleEntity.interval,
						} as const;
					},
				)
				.exhaustive();

		for await (const { next, stop, output } of startWorkerMission(missionData)) {
			if (output instanceof Error) {
				await stop();

				throw new RepositoryError(
					"worker-reject-error",
					{ error: output },
				);
			} else if (
				output.missionName !== "searchResult"
			) {
				await stop();

				throw new RepositoryError(
					"worker-return-wrong-result",
					{
						input: missionData,
						output: output,
					},
				);
			}

			next();

			yield match(output)
				.with(
					{ type: "pubmed" },
					({ step, searchResults, error }) => {
						const currentStep = EntityHandler.unsafeMapper(
							SearchResultPubMedMissionStepEntity,
							step,
						);

						return error
							? {
								currentStep,
								error: new RepositoryError("something-wrong-during-search-result-mission.", { error }),
								searchResults: undefined,
							}
							: {
								currentStep,
								searchResults: searchResults?.map(
									(searchResult) => EntityHandler.unsafeMapper(
										SearchResultEntity,
										searchResult,
									),
								),
								error: undefined,
							};
					},
				)
				.exhaustive();
		}
	},
};
