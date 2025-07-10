import { postIdObjecter } from "@business/domains/common/post";
import { baseNotificatinSchema, baseNotificationSettingSchema } from "./base";
import { userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { replyToPostNotificationTypeObjecter, summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { replyToPostNotificationSettingTypeObjecter } from "@business/domains/entities/setting/replyToPost";

export namespace ReplyToPostNotificationSchema {
	export const index = baseNotificatinSchema.extend({
		postId: postIdObjecter.zodSchema,
		usernameOfReplyPost: usernameObjecter.zodSchema,
		summaryOfReplyPost: summaryOfReplyPostObjecter.zodSchema,
		type: replyToPostNotificationTypeObjecter.zodSchema,
	});

	export const settingEnable = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	};

	export const settingDisable = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	};

	export const setting = baseNotificationSettingSchema
		.extend({
			postId: postIdObjecter.zodSchema,
			type: replyToPostNotificationSettingTypeObjecter.zodSchema,
		});

	export const settingFindOne = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
		endpoint: setting.nullable(),
	};
}
