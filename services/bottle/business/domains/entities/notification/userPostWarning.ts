import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, processedObjecter } from "./base";

export const userPostWarningPostIdObjecter = zod
	.string()
	.createValueObjecter("userPostWarningPostId");

export type UserPostWarningPostId = GetValueObject<typeof userPostWarningPostIdObjecter>;

export class UserPostWarningNotificationEntity extends EntityHandler.create(
	{
		postId: userPostWarningPostIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserPostWarningNotificationEntity>,
			"processed" | "createdAt"
		>,
	) {
		return new UserPostWarningNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
		});
	}
}
