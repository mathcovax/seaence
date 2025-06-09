import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";

export const userPostBanNotificationTypeObjecter = createNotificationTypeObjecter("userPostBanNotificationType");
export type UserPostBanNotificationType = GetValueObject<typeof userPostBanNotificationTypeObjecter>;

const timeToLive = 604800;

export class UserPostBanNotificationEntity extends EntityHandler.create(
	{
		type: userPostBanNotificationTypeObjecter,
		postId: postIdObjecter,
		reason: warningReasonObjecter,
		warningId: warningIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserPostBanNotificationEntity>,
			"processed" | "createdAt" | "deleteAt" | "type"
		>,
	) {
		return new UserPostBanNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
			type: userPostBanNotificationTypeObjecter.unsafeCreate("userPostBanNotificationType"),
		});
	}
}
