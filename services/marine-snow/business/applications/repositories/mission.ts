import { type MissionId, type MissionEntity } from "@business/domains/entities/mission";
import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Mission =
	| MissionEntity
	| SearchResultPubMedMissionEntity;

export interface MissionRepository extends RepositoryBase<Mission> {
	generateMissionId(): MissionId;
}

export const missionRepository = createRepositoryHandler<
	MissionRepository
>();
