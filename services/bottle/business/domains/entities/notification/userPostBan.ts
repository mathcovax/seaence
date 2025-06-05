import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, processedObjecter } from "./base";

export const userPostBanPostIdObjecter = zod
	.string()
	.createValueObjecter("userPostBanPostId");

export type UserPostBanPostId = GetValueObject<typeof userPostBanPostIdObjecter>;

export class UserPostBanNotificationEntity extends EntityHandler.create(
	{
		postId: userPostBanPostIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserPostBanNotificationEntity>,
			"processed" | "createdAt"
		>,
	) {
		return new UserPostBanNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
		});
	}
}
