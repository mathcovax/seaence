import { missionRepository } from "@business/applications/repositories/missions";
import { queueRepository } from "@business/applications/repositories/queue";
import { type ArticleType } from "@business/domains/common/articleType";
import { type Provider } from "@business/domains/common/provider";
import { type PublishDateSearched, SearchResultMissionEntity } from "@business/domains/entities/mission/searchResultMission";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	publishDateSearched: PublishDateSearched;
	articleType: ArticleType;
	provider: Provider;
}

export const createSearchResultMissionAndToQueueUsecase = createUsecaseHandler(
	"createSearchResultMissionAndToQueue",
	{
		missionRepository,
		queueRepository,
	},
	(
		{ missionRepository, queueRepository },
		{ publishDateSearched, articleType, provider }: Input,
	) => {
		const mission = SearchResultMissionEntity.create({
			id: missionRepository.generateMissionId(),
			publishDateSearched,
			articleType,
			provider,
		});

		return queueRepository.addInQueue(mission);
	},
);
