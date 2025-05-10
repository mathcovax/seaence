import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";

export const notificationIdObjecter = zod.string().createValueObjecter("notificationId");
export type NotificationId = GetValueObject<typeof notificationIdObjecter>;

export const processedObjecter = zod.boolean().createValueObjecter("processed");
export type Processed = GetValueObject<typeof processedObjecter>;

export class BaseNotificationEntity extends EntityHandler.create({
	id: notificationIdObjecter,
	userId: userIdObjecter,
	processed: processedObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof BaseNotificationEntity>,
			"processed" | "createdAt"
		>,
	) {
		return new BaseNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
		});
	}

	public process() {
		return this.update({
			processed: processedObjecter.unsafeCreate(true),
		});
	}
}
