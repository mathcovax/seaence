import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { answerIdObjecter } from "@business/domains/common/answer";

export const userAnswerBanNotificationTypeObjecter = createNotificationTypeObjecter("userAnswerBanNotificationType");
export type UserAnswerBanNotificationType = GetValueObject<typeof userAnswerBanNotificationTypeObjecter>;

const timeToLive = 604800;

export class UserAnswerBanNotificationEntity extends EntityHandler.create(
	{
		type: userAnswerBanNotificationTypeObjecter,
		postId: postIdObjecter,
		answerId: answerIdObjecter,
		reason: warningReasonObjecter,
		warningId: warningIdObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof UserAnswerBanNotificationEntity>,
			"processed" | "createdAt" | "deleteAt" | "type"
		>,
	) {
		return new UserAnswerBanNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
			type: userAnswerBanNotificationTypeObjecter.unsafeCreate("userAnswerBanNotificationType"),
		});
	}
}
