import { abysRepository } from "@business/applications/repositories/abys";
import { type SingleSendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/single";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";
import { missionRepository } from "@business/applications/repositories/mission";
import { searchResultRepository } from "@business/applications/repositories/searchResult";

interface Input {
	mission: SingleSendSearchResultMissionEntity;
}

export class StartSingleSendSearchResultMissionUsecase extends UsecaseHandler.create({
	abysRepository,
	missionRepository,
	searchResultRepository,
	startMission: StartMissionUsecase,
}) {
	public async execute({ mission }: Input) {
		const startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		const result = await this.abysRepository.startSingleSendSearchResultMission(mission);

		if (result instanceof Error) {
			return new UsecaseError(
				"error-when-send-search-result",
				{ error: result },
			);
		}

		if (result.failedToSend) {
			await this.searchResultRepository.save(result);

			return this.missionRepository.save(
				startedMission.failed(),
			);
		}

		await this.searchResultRepository.delete(result);

		return this.missionRepository.save(
			startedMission.success(),
		);
	}
}
