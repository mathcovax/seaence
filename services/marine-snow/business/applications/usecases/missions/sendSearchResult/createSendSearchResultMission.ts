import { missionRepository } from "@business/applications/repositories/mission";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type Int, UsecaseHandler } from "@vendors/clean";

interface Input {
	quantity: Int;
}

export class CreateSendSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ quantity }: Input) {
		const mission = SendSearchResultMissionEntity.create({
			id: this.missionRepository.generateMissionId(),
			quantity,
		});

		return this.missionRepository.save(mission);
	}
}
