import { postIdObjecter } from "@business/domains/common/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { disableReplyToPostNotificationSettingToPostUsecase, enableReplyToPostNotificationSettingsToPostUsecase } from "@interfaces/usecases";
import { IWantUserExistsById } from "../checkers/user";
import { endpointFindReplyToPostNotificationSetting } from "../schemas/notificationSetting";
import { iWantReplyToPostNotificationSettingExist } from "../checkers/notificationSetting/replyToPost";

useBuilder()
	.createRoute("POST", "/enable-reply-post-notification-setting")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const { body: { postId }, user } = pickup(["body", "user"]);

			await enableReplyToPostNotificationSettingsToPostUsecase
				.execute(
					{
						user,
						postId,
					},
				);

			return new OkHttpResponse("replyPostNotification.enable");
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.enable"),
	);

useBuilder()
	.createRoute("POST", "/disable-reply-post-notification-setting")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.presetCheck(
		iWantReplyToPostNotificationSettingExist,
		(pickup) => ({
			user: pickup("user"),
			postId: pickup("body").postId,
		}),
	)
	.handler(
		async(pickup) => {
			const { replyToPostNotificationSetting } = pickup(["replyToPostNotificationSetting"]);

			await disableReplyToPostNotificationSettingToPostUsecase
				.execute({ replyToPostNotificationSetting });

			return new OkHttpResponse("replyPostNotification.disable");
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.disable"),
	);

useBuilder()
	.createRoute("POST", "/find-reply-to-post-notification-setting")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.presetCheck(
		iWantReplyToPostNotificationSettingExist,
		(pickup) => ({
			user: pickup("user"),
			postId: pickup("body").postId,
		}),
	)
	.handler(
		(pickup) => {
			const { replyToPostNotificationSetting } = pickup(["replyToPostNotificationSetting"]);

			const simpleReplyToPostNotificationSetting = replyToPostNotificationSetting.toSimpleObject();

			return new OkHttpResponse("replyPostNotificationSetting.found", simpleReplyToPostNotificationSetting);
		},
		makeResponseContract(OkHttpResponse, "replyPostNotificationSetting.found", endpointFindReplyToPostNotificationSetting),
	);
