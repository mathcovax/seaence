import { EntityHandler, type GetValueObject, type GetEntityProperties } from "@vendors/clean";
import { SearchResultMissionEntity, searchResultMissionNameObjecter } from ".";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { dateIntervalObjecter } from "@business/domains/common/dateInterval";
import { missionStatusObjecter } from "..";
import { providerObjecter } from "@business/domains/common/provider";

export const pubMedProviderObjecter = providerObjecter.specify("pubmed");

export type PubMedProvider = GetValueObject<typeof pubMedProviderObjecter>;

export class SearchResultPubMedMissionEntity extends EntityHandler.create(
	{
		provider: pubMedProviderObjecter,
		articleType: articleTypeObjecter,
		interval: dateIntervalObjecter,
	},
	SearchResultMissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<typeof SearchResultPubMedMissionEntity>, "name" | "status">,
	) {
		return new SearchResultPubMedMissionEntity({
			...params,
			name: searchResultMissionNameObjecter.unsafeCreate("searchResult"),
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
