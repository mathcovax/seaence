import { postIdObjecter } from "@business/domains/common/post";
import { replyToPostNotificationSettingTypeObjecter } from "@business/domains/entities/setting/replyToPost";
import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";

const baseNotificationSettingSchema = zod.object({
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
});

const replyToPostNotificationSettingSchema = baseNotificationSettingSchema
	.extend({
		postId: postIdObjecter.zodSchema,
		type: replyToPostNotificationSettingTypeObjecter.zodSchema,
	});

export const endpointFindReplyToPostNotificationSetting = replyToPostNotificationSettingSchema.nullable();
