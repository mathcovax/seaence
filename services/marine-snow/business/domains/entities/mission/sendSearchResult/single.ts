import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from "..";
import { searchResultObjecter } from "@business/domains/common/searchResult";

export class SingleSendSearchResultMissionEntity extends EntityHandler.create(
	{
		searchResult: searchResultObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof SingleSendSearchResultMissionEntity>,
			"status"
		>,
	) {
		return new SingleSendSearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
