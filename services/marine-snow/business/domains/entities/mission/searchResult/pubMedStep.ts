import { dateYYYYMMDDObjecter, EntityHandler, intObjecter, type GetEntityProperties } from "@vendors/clean";
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
