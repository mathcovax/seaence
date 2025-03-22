import { missionRepository } from "@business/applications/repositories/mission";
import { type ArticleType } from "@business/domains/common/articleType";
import { type Provider } from "@business/domains/common/provider";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	fromDate: Date;
	toDate: Date;
	provider: Provider;
	articleType: ArticleType;
}

export const findSearchResultMissionUsecase = createUsecaseHandler(
	"findSearchResultMission",
	{
		missionRepository,
	},
	(
		{ missionRepository },
		{ fromDate, toDate, provider, articleType }: Input,
	) => missionRepository.findSearchResultMissionBetweenDate(
		{
			fromDate,
			toDate,
			provider,
			articleType,
		},
	),
);
