import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type SingleSendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/single";
import { type SendSearchResultMissionStepEntity } from "@business/domains/entities/mission/sendSearchResult/step";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryError, type RepositoryBase } from "@vendors/clean";

export interface SelectSearchResultToSendThemItem {
	step: SendSearchResultMissionStepEntity;
	searchResults: SearchResultEntity[];
}

export interface AbysRepository extends RepositoryBase<never> {
	startSendSearchResultMission(
		sendSearchResultMission: SendSearchResultMissionEntity,
	): AsyncGenerator<SelectSearchResultToSendThemItem | RepositoryError>;
	startSingleSendSearchResultMission(
		singleSendSearchResultMission: SingleSendSearchResultMissionEntity
	): Promise<SearchResultEntity | RepositoryError>;
}

export const abysRepository = createRepositoryHandler<
	AbysRepository
>();
