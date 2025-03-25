import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResult";
import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface StartSearchResultPubMedMissionItem {
	currentStep: SearchResultPubMedMissionStepEntity;
	searchResults: SearchResultEntity[];
}

type GetStartSearchResultItem<
	GenericSearchResultMission extends SearchResultMissionEntity,
> = Extract<
	| [SearchResultPubMedMissionEntity, StartSearchResultPubMedMissionItem],
	[GenericSearchResultMission, unknown]
>[1];

export interface SienceDatabaseRepository extends RepositoryBase<never> {
	startSearchResultMission<
		GenericSearchResultMission extends SearchResultMissionEntity,
	>(mission: GenericSearchResultMission): AsyncGenerator<
		| GetStartSearchResultItem<GenericSearchResultMission>
		| Error
	>;
}

export const sienceDatabaseRepository = createRepositoryHandler<
	SienceDatabaseRepository
>();
