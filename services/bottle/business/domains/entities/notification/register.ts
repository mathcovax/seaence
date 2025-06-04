import { commonDateObjecter, EntityHandler, type GetValueObject, type GetEntityProperties } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";

export const registerNotificationTypeObjecter = createNotificationTypeObjecter("registerNotificationType");
export type RegisterNotificationType = GetValueObject<typeof registerNotificationTypeObjecter>;

// 7 days
const timeToLive = 604800;

export class RegisterNotificationEntity extends EntityHandler.create(
	{
		type: registerNotificationTypeObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof RegisterNotificationEntity>,
			"processed" | "createdAt" | "deleteAt" | "type"
		>,
	) {
		return new RegisterNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
			type: registerNotificationTypeObjecter.unsafeCreate("registerNotificationType"),
		});
	}
}
