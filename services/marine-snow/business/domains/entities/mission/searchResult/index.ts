import { EntityHandler } from "@vendors/clean";
import { MissionEntity, missionNameObjecter } from "..";

export const searchResultMissionNameObjecter = missionNameObjecter.specify("searchResult");

export class SearchResultMissionEntity extends EntityHandler.create(
	{
		name: searchResultMissionNameObjecter,
	},
	MissionEntity,
) {}
