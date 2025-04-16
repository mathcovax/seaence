import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { type SendSearchResultMissionStepEntity } from "@business/domains/entities/mission/sendSearchResult/step";
import { type MissionStepEntity } from "@business/domains/entities/mission/step";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type MissionStep =
	| SearchResultPubMedMissionStepEntity
	| SendSearchResultMissionStepEntity;

export interface MissionStepRepository extends RepositoryBase<MissionStep | MissionStepEntity> {

}

export const missionStepRepository = createRepositoryHandler<
	MissionStepRepository
>();
