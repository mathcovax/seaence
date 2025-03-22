import { type ArticleType } from "@business/domains/common/articleType";
import { type Provider } from "@business/domains/common/provider";
import { type MissionId, type MissionEntity } from "@business/domains/entities/mission";
import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResultMission";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface FindMissionBetweenDateParams {
	fromDate: Date;
	toDate: Date;
	provider: Provider;
	articleType: ArticleType;
}

export interface MissionRepository extends RepositoryBase<MissionEntity> {
	generateMissionId(): MissionId;
	findSearchResultMissionBetweenDate(
		params: FindMissionBetweenDateParams,
	): Promise<SearchResultMissionEntity[]>;
}

export const missionRepository = createRepositoryHandler<
	MissionRepository
>();
