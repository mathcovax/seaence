import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { postIdObjecter } from "@business/domains/common/post";

export const userPostWarningNotificationTypeObjecter = createNotificationTypeObjecter("userPostWarningNotificationType");
export type UserPostWarningNotificationType = GetValueObject<typeof userPostWarningNotificationTypeObjecter>;

export class UserPostWarningNotificationEntity extends EntityHandler.create(
	{
		type: userPostWarningNotificationTypeObjecter,
		postId: postIdObjecter,
		reason: warningReasonObjecter,
		warningId: warningIdObjecter,
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
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + this.timeToLive)),
			type: userPostWarningNotificationTypeObjecter.unsafeCreate("userPostWarningNotificationType"),
		});
	}

	public static readonly timeToLive = BaseNotificationEntity.timeToLive;
}
