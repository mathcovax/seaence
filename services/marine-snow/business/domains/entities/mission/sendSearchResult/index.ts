import { EntityHandler, type GetEntityProperties, intObjecter } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from "..";

export class SendSearchResultMissionEntity extends EntityHandler.create(
	{
		quantity: intObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof SendSearchResultMissionEntity>,
			"name" | "status" | "resultDetails"
		>,
	) {
		return new SendSearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
