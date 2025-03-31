import { missionRepository } from "@business/applications/repositories/mission";
import { type ArticleType } from "@business/domains/common/articleType";
import { type DateInterval } from "@business/domains/common/dateInterval";
import { type PubMedProvider, SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	interval: DateInterval;
	articleType: ArticleType;
	provider: PubMedProvider;
}

export class CreateSearchResultPubMedMissionUsecase extends UsecaseHandler.create(
	{
		missionRepository,
	},
) {
	public execute({ interval, articleType, provider }: Input) {
		const mission = SearchResultPubMedMissionEntity.create({
			id: this.missionRepository.generateMissionId(),
			interval,
			articleType,
			provider,
		});

		return this.missionRepository.save(mission);
	}
}
