import { EntityHandler, type GetValueObject, zod, type GetEntityProperties, intObjecter } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from "..";

export const sendSearchResultMissionResultDetailsObjecter = zod
	.object({
		success: zod.number().int(),
		failed: zod.number().int(),
	})
	.createValueObjecter("sendSearchResultMissionResultDetails");

export type SendSearchResultMissionResultDetails = GetValueObject<typeof sendSearchResultMissionResultDetailsObjecter>;

export class SendSearchResultMissionEntity extends EntityHandler.create(
	{
		quantity: intObjecter,
		resultDetails: sendSearchResultMissionResultDetailsObjecter.nullable(),
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
			resultDetails: null,
		});
	}

	public successWithDetails(resultDetails: SendSearchResultMissionResultDetails) {
		return this
			.success()
			.update({
				resultDetails,
			});
	}
}
