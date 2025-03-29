import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResult";
import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryError, type RepositoryBase } from "@vendors/clean";

export type SearchResultMission =
	| SearchResultMissionEntity
	| SearchResultPubMedMissionEntity;

interface StartSearchResultPubMedMissionItem {
	currentStep: SearchResultPubMedMissionStepEntity;
	searchResults: SearchResultEntity[];
}

type GetStartSearchResultItem<
	GenericSearchResultMission extends SearchResultMission,
> = Extract<
	| [SearchResultPubMedMissionEntity, StartSearchResultPubMedMissionItem],
	[GenericSearchResultMission, unknown]
>[1];

export interface SienceDatabaseRepository extends RepositoryBase<never> {
	startSearchResultMission<
		GenericSearchResultMission extends SearchResultMission,
	>(mission: GenericSearchResultMission): AsyncGenerator<
		| GetStartSearchResultItem<GenericSearchResultMission>
		| RepositoryError
	>;
}

export const sienceDatabaseRepository = createRepositoryHandler<
	SienceDatabaseRepository
>();
