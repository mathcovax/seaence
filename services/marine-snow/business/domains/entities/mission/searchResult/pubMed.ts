import { EntityHandler, type GetEntityProperties, dateYYYYMMDDIntervalObjecter } from "@vendors/clean";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { MissionEntity, missionStatusObjecter } from "..";

export class SearchResultPubMedMissionEntity extends EntityHandler.create(
	{
		articleType: articleTypeObjecter,
		interval: dateYYYYMMDDIntervalObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<typeof SearchResultPubMedMissionEntity>, "name" | "status">,
	) {
		return new SearchResultPubMedMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
