import { commonDateObjecter, EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { BaseNotificationEntity, processedObjecter } from "./base";

// 7 days
const timeToLive = 604800;

export class RegisterNotificationEntity extends EntityHandler.create(
	{},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof RegisterNotificationEntity>,
			"processed" | "createdAt" | "deleteAt"
		>,
	) {
		return new RegisterNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
		});
	}
}
