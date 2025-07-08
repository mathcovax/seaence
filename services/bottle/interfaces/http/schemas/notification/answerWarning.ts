import { userAnswerWarningNotificationTypeObjecter } from "@business/domains/entities/notification/userAnswerWarning";
import { baseNotificatinSchema } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { answerIdObjecter } from "@business/domains/common/answer";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { userIdObjecter } from "@business/domains/entities/user";

export const userAnswerWarningNotificationSchema = baseNotificatinSchema.extend({
	type: userAnswerWarningNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	answerId: answerIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

export namespace AnswerWarningNotificationRoute {
	export const create = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			warningId: warningIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
			answerId: answerIdObjecter.toZodSchema(),
			reason: warningReasonObjecter.toZodSchema(),
		}),
	};
}
