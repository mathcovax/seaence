import { userAnswerBanNotificationTypeObjecter } from "@business/domains/entities/notification/userAnswerBan";
import { baseNotificatinSchema } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { answerIdObjecter } from "@business/domains/common/answer";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { userIdObjecter } from "@business/domains/entities/user";

export const userAnswerBanNotificationSchema = baseNotificatinSchema.extend({
	type: userAnswerBanNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	answerId: answerIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

export namespace AnswerBanNotificationRoute {
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
