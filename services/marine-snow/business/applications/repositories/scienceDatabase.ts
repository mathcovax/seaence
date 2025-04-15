import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryError, type RepositoryBase } from "@vendors/clean";

export type SearchResultMission =
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

export interface ScienceDatabaseRepository extends RepositoryBase<never> {
	startSearchResultMission<
		GenericSearchResultMission extends SearchResultMission,
	>(mission: GenericSearchResultMission): AsyncGenerator<
		| GetStartSearchResultItem<GenericSearchResultMission>
		| RepositoryError
	>;
}

export const scienceDatabaseRepository = createRepositoryHandler<
	ScienceDatabaseRepository
>();
