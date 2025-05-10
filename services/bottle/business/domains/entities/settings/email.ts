import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";

export const activatedObjecter = zod.boolean().createValueObjecter("activated");
export type ActivatedObjecter = GetValueObject<typeof activatedObjecter>;

export class EmailSettingsEntity extends EntityHandler.create({
	userId: userIdObjecter,
	activated: activatedObjecter,
}) {
	public static create(params: GetEntityProperties<typeof EmailSettingsEntity>) {
		return new EmailSettingsEntity(params);
	}
}
