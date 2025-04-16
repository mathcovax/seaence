import { type MissionEntity, type MissionId } from "@business/domains/entities/mission";
import { type PubMedSearchResultMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Mission =
	| PubMedSearchResultMissionEntity
	| SendSearchResultMissionEntity;

export interface MissionRepository extends RepositoryBase<Mission | MissionEntity> {
	generateMissionId(): MissionId;
}

export const missionRepository = createRepositoryHandler<
	MissionRepository
>();
