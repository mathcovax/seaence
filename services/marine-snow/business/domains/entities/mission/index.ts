import { providerObjecter } from "@business/domains/common/provider";
import { EntityHandler, zod, type GetValueObject } from "@vendors/clean";

export const missionIdObjecter = zod
	.string()
	.createValueObjecter("missionId");

export type MissionId = GetValueObject<typeof missionIdObjecter>;

export class MissionEntity extends EntityHandler.create({
	id: missionIdObjecter,
	provider: providerObjecter,
}) {}
