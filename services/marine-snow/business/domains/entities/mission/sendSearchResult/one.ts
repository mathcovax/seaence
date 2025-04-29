import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from "..";
import { searchResultObjecter } from "@business/domains/common/searchResult";

export class SendOneSearchResultMissionEntity extends EntityHandler.create(
	{
		searchResult: searchResultObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof SendOneSearchResultMissionEntity>,
			"status"
		>,
	) {
		return new SendOneSearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
