import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { SearchResultMissionEntity, searchResultMissionNameObjecter } from ".";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { dateIntervalObjecter } from "@business/domains/common/dateInterval";
import { missionStatusObjecter } from "..";

export class SearchResultPubMedMissionEntity extends EntityHandler.create(
	{
		articleType: articleTypeObjecter,
		interval: dateIntervalObjecter,
	},
	SearchResultMissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<typeof SearchResultPubMedMissionEntity>, "name" | "status">,
	) {
		return new SearchResultMissionEntity({
			...params,
			name: searchResultMissionNameObjecter.unsafeCreate("searchResult"),
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
