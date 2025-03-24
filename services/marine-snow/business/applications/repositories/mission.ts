import { type MissionId, type MissionEntity } from "@business/domains/entities/mission";
import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResultMission";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Mission =
	| SearchResultMissionEntity;

export interface MissionRepository extends RepositoryBase<MissionEntity> {
	generateMissionId(): MissionId;
}

export const missionRepository = createRepositoryHandler<
	MissionRepository
>();
