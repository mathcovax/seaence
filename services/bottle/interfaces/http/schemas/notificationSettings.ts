import { postIdObjecter } from "@business/domains/common/post";
import { replyToPostNotificationSettingsTypeObjecter } from "@business/domains/entities/settings/replyToPost";
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
		type: replyToPostNotificationSettingsTypeObjecter.zodSchema,
	});

export const endpointFindReplyToPostNotificationSettings = replyToPostNotificationSettingsSchema.nullable();
