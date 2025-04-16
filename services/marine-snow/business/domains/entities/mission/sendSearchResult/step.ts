import { EntityHandler, intObjecter, type GetEntityProperties } from "@vendors/clean";
import { MissionStepEntity } from "../step";
import { SearchResultEntity } from "../../searchResult";

export const faildedSendSearchResultMissionStepObjecter = EntityHandler.createEntityObjecter(
	"faildedSendSearchResultMissionStep",
	SearchResultEntity,
);

export class SendSearchResultMissionStepEntity extends EntityHandler.create(
	{
		quantityProcessed: intObjecter,
		faildedSearchResults: faildedSendSearchResultMissionStepObjecter.array(),
	},
	MissionStepEntity,
) {
	public static create(params: GetEntityProperties<typeof SendSearchResultMissionStepEntity>) {
		return new SendSearchResultMissionStepEntity(params);
	}
}
