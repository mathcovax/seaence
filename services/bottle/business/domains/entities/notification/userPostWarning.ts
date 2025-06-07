import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";

export const userPostWarningPostIdObjecter = zod
	.string()
	.createValueObjecter("userPostWarningPostId");

export type UserPostWarningPostId = GetValueObject<typeof userPostWarningPostIdObjecter>;

export const userPostWarningNotificationTypeObjecter = createNotificationTypeObjecter("userPostWarningNotificationType");
export type UserPostWarningNotificationType = GetValueObject<typeof userPostWarningNotificationTypeObjecter>;

const timeToLive = 604800;

export class UserPostWarningNotificationEntity extends EntityHandler.create(
	{
		type: userPostWarningNotificationTypeObjecter,
		postId: userPostWarningPostIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserPostWarningNotificationEntity>,
			"processed" | "createdAt" | "deleteAt" | "type"
		>,
	) {
		return new UserPostWarningNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
			type: userPostWarningNotificationTypeObjecter.unsafeCreate("userPostWarningNotificationType"),
		});
	}
}
