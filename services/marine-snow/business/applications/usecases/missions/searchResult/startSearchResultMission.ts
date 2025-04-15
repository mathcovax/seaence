import { missionRepository } from "@business/applications/repositories/mission";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { missionStepRepository } from "@business/applications/repositories/missionStep";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";
import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";

interface Input {
	mission: SearchResultPubMedMissionEntity;
}

export class StartSearchResultMissionUsecase extends UsecaseHandler.create({
	scienceDatabaseRepository,
	missionStepRepository,
	searchResultRepository,
	missionRepository,
	startMission: StartMissionUsecase,
}) {
	public async execute({ mission }: Input) {
		const startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		for await (
			const result of this.scienceDatabaseRepository
				.startSearchResultMission(startedMission)
		) {
			if (result instanceof Error) {
				void await this.missionRepository.save(
					startedMission.failed(),
				);

				return new UsecaseError("error-when-fetching-search-result", { error: result });
			}

			const {
				currentStep,
				searchResults,
			} = result;

			await this.missionStepRepository.save(currentStep);

			await Promise.all(
				searchResults.map(
					this.searchResultRepository.save,
				),
			);
		}

		return this.missionRepository.save(startedMission.success());
	}
}
