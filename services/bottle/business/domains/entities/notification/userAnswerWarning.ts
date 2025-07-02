import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { answerIdObjecter } from "@business/domains/common/answer";

export const userAnswerWarningNotificationTypeObjecter = createNotificationTypeObjecter("userAnswerWarningNotificationType");
export type UserAnswerWarningNotificationType = GetValueObject<typeof userAnswerWarningNotificationTypeObjecter>;

const timeToLive = 604800;

export class UserAnswerWarningNotificationEntity extends EntityHandler.create(
	{
		type: userAnswerWarningNotificationTypeObjecter,
		postId: postIdObjecter,
		answerId: answerIdObjecter,
		reason: warningReasonObjecter,
		warningId: warningIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserAnswerWarningNotificationEntity>,
			"processed" | "createdAt" | "deleteAt" | "type"
		>,
	) {
		return new UserAnswerWarningNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
			type: userAnswerWarningNotificationTypeObjecter.unsafeCreate("userAnswerWarningNotificationType"),
		});
	}
}
