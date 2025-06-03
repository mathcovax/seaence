import { zod } from "@vendors/clean";
import { userObjecter, userUsernameObjecter } from "./user";
import { languageObjecter } from "./common/language";

const baseNotificatinSchema = zod.object({
	id: zod.string(),
	user: userObjecter.zodSchema.omit({
		lastUpdate: true,
	}).extend({
		language: languageObjecter.zodSchema,
	}),
	processed: zod.boolean(),
	createdAt: zod.string(),
	deleteAt: zod.string(),
});

export const registerNotificationObjecter = baseNotificatinSchema.createValueObjecter("registerNotification");

export const summaryOfReplyPostObjecter = zod.string().createValueObjecter("summaryOfReplyPost");

export const replyToPostNotificationObjecter = baseNotificatinSchema.extend({
	postId: zod.string(),
	usernameOfReplyPost: userUsernameObjecter.zodSchema,
	summaryOfReplyPost: summaryOfReplyPostObjecter.zodSchema,
}).createValueObjecter("replyToPostNotification");

export const notificationObjecter = zod.union([
	registerNotificationObjecter.zodSchema,
	replyToPostNotificationObjecter.zodSchema,
]).createValueObjecter("notification");
