import { userPostWarningNotificationTypeObjecter } from "@business/domains/entities/notification/userPostWarning";
import { baseNotificatinSchema } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { userIdObjecter } from "@business/domains/entities/user";
export namespace PostWarningNotificationRoute {
	export const index = baseNotificatinSchema.extend({
		type: userPostWarningNotificationTypeObjecter.zodSchema,
		postId: postIdObjecter.zodSchema,
		reason: warningReasonObjecter.zodSchema,
		warningId: warningIdObjecter.zodSchema,
	});

	export const create = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			warningId: warningIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
			reason: warningReasonObjecter.toZodSchema(),
		}),
	};
}
