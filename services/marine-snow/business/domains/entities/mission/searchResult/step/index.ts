import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { missionIdObjecter } from "../..";

export class SearchResultMissionStepEntity extends EntityHandler.create({
	missionId: missionIdObjecter,
}) {
	public static create(params: GetEntityProperties<typeof SearchResultMissionStepEntity>) {
		return new SearchResultMissionStepEntity(params);
	}
}
