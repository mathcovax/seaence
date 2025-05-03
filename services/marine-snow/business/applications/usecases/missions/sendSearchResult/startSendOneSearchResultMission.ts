import { abysRepository } from "@business/applications/repositories/abys";
import { type SendOneSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/one";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";
import { missionRepository } from "@business/applications/repositories/mission";
import { searchResultRepository } from "@business/applications/repositories/searchResult";

interface Input {
	mission: SendOneSearchResultMissionEntity;
}

export class StartSendOneSearchResultMissionUsecase extends UsecaseHandler.create({
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

		const result = await this.abysRepository.startSendOneSearchResultMission(mission);

		if (result instanceof Error) {
			const failedMission = await this.missionRepository.save(
				startedMission.failed(),
			);

			return new UsecaseError(
				"error-when-send-search-result",
				{
					error: result,
					failedMission,
				},
			);
		}

		if (result.failedToSend.value) {
			await this.searchResultRepository.save(result);

			const failedMission = await this.missionRepository.save(
				startedMission.failed(),
			);

			return new UsecaseError(
				"failed-to-send-search-result",
				{
					result,
					failedMission,
				},
			);
		}

		await this.searchResultRepository.delete(result);

		return this.missionRepository.save(
			startedMission.success(),
		);
	}
}
