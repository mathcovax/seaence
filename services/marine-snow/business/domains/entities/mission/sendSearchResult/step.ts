import { EntityHandler, intObjecter, type GetEntityProperties } from "@vendors/clean";
import { MissionStepEntity } from "../step";
import { searchResultObjecter } from "@business/domains/common/searchResult";

export class SendSearchResultMissionStepEntity extends EntityHandler.create(
	{
		quantityProcessed: intObjecter,
		faildedSearchResults: searchResultObjecter.array(),
	},
	MissionStepEntity,
) {
	public static create(params: GetEntityProperties<typeof SendSearchResultMissionStepEntity>) {
		return new SendSearchResultMissionStepEntity(params);
	}
}
