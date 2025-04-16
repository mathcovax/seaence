import { EntityHandler, type GetEntityProperties, dateYYYYMMDDIntervalObjecter } from "@vendors/clean";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { MissionEntity, missionStatusObjecter } from "..";

export class PubMedSearchResultMissionEntity extends EntityHandler.create(
	{
		articleType: articleTypeObjecter,
		interval: dateYYYYMMDDIntervalObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<typeof PubMedSearchResultMissionEntity>, "name" | "status">,
	) {
		return new PubMedSearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
