import { providerObjecter } from "@business/domains/common/provider";
import { EntityHandler, type GetValueObject, type GetEntityProperties } from "@vendors/clean";

export const missionIdObjecter = zod
	.string()
	.createValueObjecter("missionId");

export const missionStatusValue = [
	"inQueue",
	"inProgress",
	"failed",
	"success",
] as const;

export const missionStatusObjecter = zod
	.enum(missionStatusValue)
	.createValueObjecter("missionStatus");

export type MissionId = GetValueObject<typeof missionIdObjecter>;

export class MissionEntity extends EntityHandler.create({
	id: missionIdObjecter,
	provider: providerObjecter,
	status: missionStatusObjecter,
}) {
	public static create(params: Omit<GetEntityProperties<MissionEntity>, "status">) {
		return new MissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("inQueue"),
		});
	}
}
