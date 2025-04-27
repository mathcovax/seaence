import { missionRepository } from "@business/applications/repositories/mission";
import { type MissionId } from "@business/domains/entities/mission";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	id: MissionId;
}

export class FindPubMedSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ id }: Input) {
		return this.missionRepository.findPubMedSearchResultMission(id);
	}
}
