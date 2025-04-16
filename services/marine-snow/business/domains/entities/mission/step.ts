import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { missionIdObjecter } from ".";

export class MissionStepEntity extends EntityHandler.create({
	missionId: missionIdObjecter,
}) {
	public static create(params: GetEntityProperties<typeof MissionStepEntity>) {
		return new MissionStepEntity(params);
	}
}
