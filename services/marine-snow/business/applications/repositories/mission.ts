import { type MissionId, type MissionEntity } from "@business/domains/entities/mission";
import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Mission =
	| SearchResultPubMedMissionEntity;

export interface MissionRepository extends RepositoryBase<MissionEntity> {
	generateMissionId(): MissionId;
}

export const missionRepository = createRepositoryHandler<
	MissionRepository
>();
