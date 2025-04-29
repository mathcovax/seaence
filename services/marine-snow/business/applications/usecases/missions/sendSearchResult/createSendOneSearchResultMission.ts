import { missionRepository } from "@business/applications/repositories/mission";
import { type SearchResult } from "@business/domains/common/searchResult";
import { SendOneSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/one";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	valueSearchResult: SearchResult;
}

export class CreateSendOneSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ valueSearchResult }: Input) {
		return this.missionRepository.save(
			SendOneSearchResultMissionEntity.create({
				id: this.missionRepository.generateMissionId(),
				searchResult: valueSearchResult,
			}),
		);
	}
}
