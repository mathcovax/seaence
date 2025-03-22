import { missionRepository } from "@business/applications/repositories/missions";
import { type MissionEntity } from "@business/domains/entities/mission";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	mission: MissionEntity;
}

export const searchResultMissionSuccessUsecase = createUsecaseHandler(
	"searchResultMissionSuccess",
	{
		missionRepository,
	},
	(
		{ missionRepository },
		{ mission }: Input,
	) => {
		const successMission = mission.success();

		return missionRepository.save(successMission);
	},
);
