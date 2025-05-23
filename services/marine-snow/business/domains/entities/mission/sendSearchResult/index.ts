import { EntityHandler, type GetEntityProperties, intObjecter } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from "..";

export class SendSearchResultMissionEntity extends EntityHandler.create(
	{
		concurrency: intObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof SendSearchResultMissionEntity>,
			"status"
		>,
	) {
		return new SendSearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("created"),
		});
	}
}
