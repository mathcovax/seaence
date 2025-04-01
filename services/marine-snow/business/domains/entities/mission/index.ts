import { providerObjecter } from "@business/domains/common/provider";
import { createEnum, EntityHandler, zod, type GetValueObject } from "@vendors/clean";

export const missionIdObjecter = zod
	.string()
	.createValueObjecter("missionId");

export type MissionId = GetValueObject<typeof missionIdObjecter>;

export const missionStatusEnum = createEnum([
	"created",
	"inProgress",
	"failed",
	"success",
]);

export const missionStatusObjecter = zod
	.enum(missionStatusEnum.toTuple())
	.createValueObjecter("missionStatus");

export type MissionStatusId = GetValueObject<typeof missionStatusObjecter>;

export const missionNameEnum = createEnum([
	"searchResult",
	"sendSearchResult",
]);

export const missionNameObjecter = zod
	.enum(missionNameEnum.toTuple())
	.createValueObjecter("searchResultMissionName");

export class MissionEntity extends EntityHandler.create({
	id: missionIdObjecter,
	provider: providerObjecter,
	status: missionStatusObjecter,
	name: missionNameObjecter,
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
