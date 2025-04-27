import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";
import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { abysRepository } from "@business/applications/repositories/abys";
import { missionRepository } from "@business/applications/repositories/mission";
import { missionStepRepository } from "@business/applications/repositories/missionStep";

interface Input {
	mission: SendSearchResultMissionEntity;
}

export class StartSendSearchResultMissionUsecase extends UsecaseHandler.create({
	startMission: StartMissionUsecase,
	searchResultRepository,
	abysRepository,
	missionRepository,
	missionStepRepository,
}) {
	public async execute({ mission }: Input) {
		const startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		for await (
			const result of this.abysRepository
				.startSendSearchResultMission(startedMission)
		) {
			if (result instanceof Error) {
				await this.missionRepository.save(
					startedMission.failed(),
				);

				return new UsecaseError(
					"error-when-send-search-result",
					{ error: result },
				);
			}

			const {
				step,
				searchResults,
			} = result;

			await this.missionStepRepository.save(step);

			await Promise.all(
				searchResults.map(
					(searchResult) => searchResult.failedToSend.value
						? this.searchResultRepository.save(searchResult)
						: this.searchResultRepository.delete(searchResult),
				),
			);

			if (step.faildedSearchResults.length) {
				await this.missionRepository.save(
					startedMission.failed(),
				);

				return new UsecaseError(
					"sending-search-result-failded",
					{ faildedSearchResults: step.faildedSearchResults },
				);
			}
		}

		return this.missionRepository.save(
			startedMission.success(),
		);
	}
}
