import { EntityHandler, zod } from "@vendors/clean";
import { MissionEntity } from "..";

export const searchResultMissionNameObjecter = zod
	.literal("searchResult")
	.createValueObjecter("searchResultMissionName");

export class SearchResultMissionEntity extends EntityHandler.create(
	{
		name: searchResultMissionNameObjecter,
	},
	MissionEntity,
) {}
