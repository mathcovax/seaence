import { missionRepository } from "@business/applications/repositories/mission";
import { type SearchResult } from "@business/domains/common/searchResult";
import { SingleSendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/single";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	searchResult: SearchResult;
}

export class createSingleSendSearchResultMissionUsecase extends UsecaseHandler.create({
	missionRepository,
}) {
	public execute({ searchResult }: Input) {
		return this.missionRepository.save(
			SingleSendSearchResultMissionEntity.create({
				id: this.missionRepository.generateMissionId(),
				searchResult,
			}),
		);
	}
}
