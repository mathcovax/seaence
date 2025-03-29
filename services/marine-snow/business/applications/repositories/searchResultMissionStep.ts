import { type SearchResultMissionStepEntity } from "@business/domains/entities/mission/searchResult/step";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type SearchResultMissionStep =
	| SearchResultMissionStepEntity
	| SearchResultPubMedMissionStepEntity;

export interface SearchResultMissionStepRepository extends RepositoryBase<SearchResultMissionStep> {

}

export const searchResultMissionStepRepository = createRepositoryHandler<
	SearchResultMissionStepRepository
>();
