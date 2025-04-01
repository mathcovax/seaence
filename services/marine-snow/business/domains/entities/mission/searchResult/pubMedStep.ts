import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { dateYYYYMMDDObjecter } from "@business/domains/common/dateYYYYMMDD";
import { intObjecter } from "@business/domains/common/int";
import { MissionStepEntity } from "../step";

export class SearchResultPubMedMissionStepEntity extends EntityHandler.create(
	{
		date: dateYYYYMMDDObjecter,
		page: intObjecter,
	},
	MissionStepEntity,
) {
	public static create(params: GetEntityProperties<typeof SearchResultPubMedMissionStepEntity>) {
		return new SearchResultPubMedMissionStepEntity(params);
	}
}
