import { missionRepository } from "@business/applications/repositories/missions";
import { type MissionEntity } from "@business/domains/entities/mission";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	mission: MissionEntity;
}

export const searchResultMissionFailedUsecase = createUsecaseHandler(
	"searchResultMissionFailed",
	{
		missionRepository,
	},
	(
		{ missionRepository },
		{ mission }: Input,
	) => {
		const failedMission = mission.failed();

		return missionRepository.save(failedMission);
	},
);
