import { missionRepository } from "@business/applications/repositories/mission";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { missionStepRepository } from "@business/applications/repositories/missionStep";
import { scienceDatabaseRepository, type SearchResultMission } from "@business/applications/repositories/scienceDatabase";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";

interface Input<
	GenericMission extends SearchResultMission,
> {
	mission: GenericMission;
}

export class StartSearchResultMissionUsecase extends UsecaseHandler.create({
	scienceDatabaseRepository,
	missionStepRepository,
	searchResultRepository,
	missionRepository,
	startMission: StartMissionUsecase,
}) {
	public async execute<
		GenericMission extends SearchResultMission,
	>({ mission }: Input<GenericMission>) {
		const startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		for await (
			const result of this.scienceDatabaseRepository
				.startSearchResultMission(startedMission)
		) {
			if ("currentStep" in result) {
				await this.missionStepRepository.save(result.currentStep);
			}

			if (result instanceof Error || result.error) {
				await this.missionRepository.save(
					startedMission.failed(),
				);

				return new UsecaseError("error-when-fetching-search-result", {
					error: result instanceof Error ? result : result.error,
					mission: startedMission,
				});
			}

			const { searchResults } = result;

			await Promise.all(
				searchResults.map(
					this.searchResultRepository.save,
				),
			);
		}

		return this.missionRepository.save(startedMission.success());
	}
}
