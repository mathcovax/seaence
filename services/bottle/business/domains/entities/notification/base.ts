import { commonDateObjecter, EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userIdObjecter } from "../user";

export const notificationIdObjecter = zod.string().createValueObjecter("notificationId");
export type NotificationId = GetValueObject<typeof notificationIdObjecter>;

export const processedObjecter = zod.boolean().createValueObjecter("processed");
export type Processed = GetValueObject<typeof processedObjecter>;

export class BaseNotificationEntity extends EntityHandler.create({
	id: notificationIdObjecter,
	userId: userIdObjecter,
	processed: processedObjecter,
	createdAt: commonDateObjecter,
	deleteAt: commonDateObjecter,
}) {
	public process() {
		return this.update({
			processed: processedObjecter.unsafeCreate(true),
		});
	}
}
