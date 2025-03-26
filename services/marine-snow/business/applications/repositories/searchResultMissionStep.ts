import { type SearchResultMissionStepEntity } from "@business/domains/entities/mission/searchResult/step";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface SearchResultMissionStepRepository extends RepositoryBase<SearchResultMissionStepEntity> {

}

export const searchResultMissionStepRepository = createRepositoryHandler<
	SearchResultMissionStepRepository
>();
