import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { type MissionStepEntity } from "@business/domains/entities/mission/step";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type MissionStep =
	| MissionStepEntity
	| SearchResultPubMedMissionStepEntity;

export interface MissionStepRepository extends RepositoryBase<MissionStep> {

}

export const missionStepRepository = createRepositoryHandler<
	MissionStepRepository
>();
