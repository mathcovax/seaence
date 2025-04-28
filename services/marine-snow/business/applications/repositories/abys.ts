import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type SendOneSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/one";
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
	startSendOneSearchResultMission(
		sendOneSearchResultMission: SendOneSearchResultMissionEntity
	): Promise<SearchResultEntity | RepositoryError>;
}

export const abysRepository = createRepositoryHandler<
	AbysRepository
>();
