import { missionRepository } from "@business/applications/repositories/mission";
import { type Int } from "@business/domains/common/int";
import { type Provider } from "@business/domains/common/provider";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	quantity: Int;
}

export class CreateSendSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ provider, quantity }: Input) {
		const mission = SendSearchResultMissionEntity.create({
			id: this.missionRepository.generateMissionId(),
			provider,
			quantity,
		});

		return this.missionRepository.save(mission);
	}
}
