import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, expiresAtObjecter, processedObjecter } from "./base";
import { userIdObjecter } from "../user";

export const emailContentObjecter = zod.string().createValueObjecter("emailContent");
export type EmailContent = GetValueObject<typeof emailContentObjecter>;

// 7 days
const timeToLive = 604800;
const expiresAtDefault = new Date(Date.now() + timeToLive);

export class RegisterNotificationEntity extends EntityHandler.create(
	{
		userId: userIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof RegisterNotificationEntity>,
			"processed" | "createdAt" | "expiresAt"
		>,
	) {
		return new RegisterNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			expiresAt: expiresAtObjecter.unsafeCreate(expiresAtDefault),
		});
	}
}
