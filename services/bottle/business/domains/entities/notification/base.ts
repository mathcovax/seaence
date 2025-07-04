import { commonDateObjecter, EntityHandler, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "@business/domains/common/user";

export const notificationIdObjecter = zod.string().createValueObjecter("notificationId");
export type NotificationId = GetValueObject<typeof notificationIdObjecter>;

export const processedObjecter = zod.boolean().createValueObjecter("processed");
export type Processed = GetValueObject<typeof processedObjecter>;

export function createNotificationTypeObjecter<
	GenericNotificationType extends string,
>(type: GenericNotificationType) {
	return zod.literal(type)
		.createValueObjecter(type);
}

export class BaseNotificationEntity extends EntityHandler.create({
	id: notificationIdObjecter,
	user: userObjecter,
	processed: processedObjecter,
	createdAt: commonDateObjecter,
	deleteAt: commonDateObjecter,
}) {
	public process() {
		return this.update({
			processed: processedObjecter.unsafeCreate(true),
		});
	}

	public static readonly timeToLive = 604_800_000;
}
