import { postIdObjecter } from "@business/domains/common/post";
import { notificationIdObjecter, processedObjecter } from "@business/domains/entities/notification/base";
import { summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { commonDateObjecter } from "@vendors/clean";

const baseNotificatinSchema = zod.object({
	id: notificationIdObjecter.zodSchema,
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
	processed: processedObjecter.zodSchema,
	createdAt: commonDateObjecter.zodSchema,
	deleteAt: commonDateObjecter.zodSchema,
});

const registerNotificationSchema = baseNotificatinSchema;

const replyToPostNotificationSchema = baseNotificatinSchema.extend({
	postId: postIdObjecter.zodSchema,
	usernameOfReplyPost: usernameObjecter.zodSchema,
	summaryOfReplyPost: summaryOfReplyPostObjecter.zodSchema,
});

export const endpointFindNotification = zod.union([
	registerNotificationSchema,
	replyToPostNotificationSchema,
]).array();

export const endpointCountNotification = zod.object({
	count: zod.number(),
});
