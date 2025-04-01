import { EntityHandler, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";
import { MissionEntity, missionNameObjecter, missionStatusObjecter } from "..";
import { intObjecter } from "@business/domains/common/int";

export const sendSearchResultMissionNameObjecter = missionNameObjecter.specify("sendSearchResult");

export const sendSearchResultMissionResultDetailsObjecter = zod
	.object({
		success: zod.number().int(),
		failed: zod.number().int(),
	})
	.createValueObjecter("sendSearchResultMissionResultDetails");

export type SendSearchResultMissionResultDetails = GetValueObject<typeof sendSearchResultMissionResultDetailsObjecter>;

export class SendSearchResultMissionEntity extends EntityHandler.create(
	{
		name: sendSearchResultMissionNameObjecter,
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
			name: sendSearchResultMissionNameObjecter.unsafeCreate("sendSearchResult"),
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
