import { missionRepository } from "@business/applications/repositories/mission";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { searchResultMissionStepRepository } from "@business/applications/repositories/searchResultMissionStep";
import { sienceDatabaseRepository } from "@business/applications/repositories/sienceDatabase";
import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResult";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	mission: SearchResultMissionEntity;
}

export class StartSearchResultMissionUsecase extends UsecaseHandler.create({
	sienceDatabaseRepository,
	searchResultMissionStepRepository,
	searchResultRepository,
	missionRepository,
}) {
	public async execute({ mission }: Input) {
		if (mission.status.value !== "created") {
			return new UsecaseError("wrong-mission-status");
		}

		const startedMission = mission.start();

		await this.missionRepository.save(startedMission);

		for await (
			const result of this.sienceDatabaseRepository
				.startSearchResultMission(startedMission)
		) {
			if (result instanceof Error) {
				void await this.missionRepository.save(startedMission.failed());

				return new UsecaseError("error-when-fetching-search-result");
			}

			const {
				currentStep,
				searchResults,
			} = result;

			await this.searchResultMissionStepRepository.save(currentStep);

			await Promise.all(
				searchResults.map(
					this.searchResultRepository.save,
				),
			);
		}

		return this.missionRepository.save(startedMission.success());
	}
}
