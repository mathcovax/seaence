import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { SearchResultMissionStepEntity } from ".";
import { dateYYYYMMDDObjecter } from "@business/domains/common/dateYYYYMMDD";
import { intObjecter } from "@business/domains/common/int";

export class SearchResultPubMedMissionStepEntity extends EntityHandler.create(
	{
		date: dateYYYYMMDDObjecter,
		page: intObjecter,
	},
	SearchResultMissionStepEntity,
) {
	public static create(params: GetEntityProperties<SearchResultPubMedMissionStepEntity>) {
		return new SearchResultPubMedMissionStepEntity(params);
	}
}
