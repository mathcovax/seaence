import { type SearchResultMission, scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SupportedSearchResultMission } from "@interfaces/workers/missions/searchResult";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { match, P } from "ts-pattern";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { startWorkerMission } from "@interfaces/workers";

scienceDatabaseRepository.default = {
	save() {
		throw new RepositoryError("Unsupport save method");
	},

	async *startSearchResultMission(mission) {
		const missionData: SupportedSearchResultMission
			= match({ mission: mission as SearchResultMission })
				.with(
					{ mission: P.instanceOf(SearchResultPubMedMissionEntity) },
					({ mission }) => ({
						provider: "pubmed",
						missionName: "searchResult",
						...mission.toSimpleObject(),
					}) as const,
				)
				.exhaustive();

		for await (const { next, stop, output } of startWorkerMission(missionData)) {
			if (output instanceof Error) {
				await stop();

				return new RepositoryError(
					"worker-reject-error",
					{ error: output },
				);
			} else if (
				output.missionName !== "searchResult"
			) {
				await stop();

				return new RepositoryError(
					"worker-return-wrong-result",
					{
						custom: {
							input: missionData,
							output: output,
						},
					},
				);
			}

			next();

			yield match(output)
				.with(
					{ type: "pubmed" },
					({ step, searchResults }) => ({
						currentStep: EntityHandler.unsafeMapper(
							SearchResultPubMedMissionStepEntity,
							step,
						),
						searchResults: searchResults.map(
							(searchResult) => EntityHandler.unsafeMapper(
								SearchResultEntity,
								searchResult,
							),
						),
					}),
				)
				.exhaustive();
		}
	},
};
