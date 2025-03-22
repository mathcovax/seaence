import { missionRepository } from "@business/applications/repositories/mission";
import { type MissionEntity } from "@business/domains/entities/mission";
import { UsecaseError, createUsecaseHandler } from "@vendors/clean";

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
		if (mission.status.value !== "inProgress") {
			return new UsecaseError("wrong-mission-status");
		}

		const failedMission = mission.failed();

		return missionRepository.save(failedMission);
	},
);
