import { providerObjecter } from "@business/domains/common/provider";
import { EntityHandler, zod, type GetValueObject } from "@vendors/clean";

export const missionIdObjecter = zod
	.string()
	.createValueObjecter("missionId");

export type MissionId = GetValueObject<typeof missionIdObjecter>;

export const missionStatusValue = [
	"created",
	"inProgress",
	"failed",
	"success",
] as const;

export const missionStatusObjecter = zod
	.enum(missionStatusValue)
	.createValueObjecter("missionStatus");

export type MissionStatusId = GetValueObject<typeof missionStatusObjecter>;

export class MissionEntity extends EntityHandler.create({
	id: missionIdObjecter,
	provider: providerObjecter,
	status: missionStatusObjecter,
}) {
	public start() {
		return this.update({
			status: missionStatusObjecter.unsafeCreate("inProgress"),
		});
	}

	public failed() {
		return this.update({
			status: missionStatusObjecter.unsafeCreate("failed"),
		});
	}

	public success() {
		return this.update({
			status: missionStatusObjecter.unsafeCreate("success"),
		});
	}
}
