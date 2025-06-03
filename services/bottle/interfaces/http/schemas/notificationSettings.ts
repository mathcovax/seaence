import { postIdObjecter } from "@business/domains/common/post";
import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";

const baseNotificationSettingsSchema = zod.object({
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
});

const replyToPostNotificationSettingsSchema = baseNotificationSettingsSchema
	.extend({
		postId: postIdObjecter.zodSchema,
	});

export const endpointFindReplyToPostNotificationSettings = replyToPostNotificationSettingsSchema.nullable();
