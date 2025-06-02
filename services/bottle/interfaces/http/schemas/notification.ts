import { postIdObjecter } from "@business/domains/common/post";
import { notificationIdObjecter, processedObjecter } from "@business/domains/entities/notification/base";
import { summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { commonDateObjecter } from "@vendors/clean";

const baseNotificatinSchema = zod.object({
	id: notificationIdObjecter.zodSchema,
	userId: userIdObjecter.zodSchema,
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

export const endpointFindProcessedNotification = zod.union([
	registerNotificationSchema,
	replyToPostNotificationSchema,
]).array();
