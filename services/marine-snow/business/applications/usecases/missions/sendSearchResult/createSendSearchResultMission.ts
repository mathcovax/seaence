import { missionRepository } from "@business/applications/repositories/mission";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type Int, UsecaseHandler } from "@vendors/clean";

interface Input {
	concurrency: Int;
}

export class CreateSendSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ concurrency }: Input) {
		const mission = SendSearchResultMissionEntity.create({
			id: this.missionRepository.generateMissionId(),
			concurrency,
		});

		return this.missionRepository.save(mission);
	}
}
