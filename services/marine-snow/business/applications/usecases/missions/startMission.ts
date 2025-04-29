import { missionRepository } from "@business/applications/repositories/mission";
import { type MissionEntity } from "@business/domains/entities/mission";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input<
	GenericMission extends MissionEntity,
> {
	mission: GenericMission;
}

export class StartMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute<
		GenericMission extends MissionEntity,
	>({ mission }: Input<GenericMission>) {
		if (mission.status.value !== "created" && mission.status.value !== "resume") {
			return new UsecaseError("wrong-mission-status", {
				mission,
				expect: ["created", "resume"],
			});
		}

		const startedMission = mission.start();

		return this.missionRepository.save(startedMission);
	}
}
