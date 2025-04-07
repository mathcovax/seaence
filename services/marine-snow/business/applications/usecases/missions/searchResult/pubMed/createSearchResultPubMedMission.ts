import { missionRepository } from "@business/applications/repositories/mission";
import { type ArticleType } from "@business/domains/common/articleType";
import { SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type DateYYYYMMDDInterval, UsecaseHandler } from "@vendors/clean";

interface Input {
	interval: DateYYYYMMDDInterval;
	articleType: ArticleType;
}

export class CreateSearchResultPubMedMissionUsecase extends UsecaseHandler.create(
	{
		missionRepository,
	},
) {
	public execute({ interval, articleType }: Input) {
		const mission = SearchResultPubMedMissionEntity.create({
			id: this.missionRepository.generateMissionId(),
			interval,
			articleType,
		});

		return this.missionRepository.save(mission);
	}
}
