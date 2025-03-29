import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type EntityToSimpleObject } from "@vendors/clean";

export type SupportedSearchResultMission =
	| EntityToSimpleObject<typeof SearchResultPubMedMissionEntity>;

interface OutputSearchResultPudMedMission {
	type: "PubMed";
	step: EntityToSimpleObject<typeof SearchResultPubMedMissionStepEntity>;
	searchResults: EntityToSimpleObject<typeof SearchResultEntity>[];
}

export type SearchResultMissionOutput =
	| OutputSearchResultPudMedMission
	| "finish";

export function mission(missionData: SupportedSearchResultMission) {

}
