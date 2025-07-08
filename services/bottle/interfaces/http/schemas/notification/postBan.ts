import { userPostBanNotificationTypeObjecter } from "@business/domains/entities/notification/userPostBan";
import { baseNotificatinSchema } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { userIdObjecter } from "@business/domains/entities/user";

export const userPostBanNotificationSchema = baseNotificatinSchema.extend({
	type: userPostBanNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

export namespace PostBanNotificationRoute {
	export const create = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			warningId: warningIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
			reason: warningReasonObjecter.toZodSchema(),
		}),
	};
}
