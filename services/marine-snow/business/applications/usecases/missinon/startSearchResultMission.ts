import { missionRepository } from "@business/applications/repositories/mission";
import { type MissionEntity } from "@business/domains/entities/mission";
import { UsecaseError, createUsecaseHandler } from "@vendors/clean";

interface Input {
	mission: MissionEntity;
}

export const startSearchResultMissionUsecase = createUsecaseHandler(
	"startSearchResultMission",
	{
		missionRepository,
	},
	(
		{ missionRepository },
		{ mission }: Input,
	) => {
		if (mission.status.value !== "inQueue") {
			return new UsecaseError("wrong-mission-status");
		}

		const inProgressMission = mission.start();

		return missionRepository.save(inProgressMission);
	},
);
