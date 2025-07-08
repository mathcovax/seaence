import { iWantReplyToPostNotificationSettingExist } from "@interfaces/http/checkers/notificationSetting/replyToPost";
import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { ReplyToPostNotificationRoute } from "@interfaces/http/schemas/notification/replyToPost";
import { disableReplyToPostNotificationSettingToPostUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-reply-post-setting-disable")
	.extract({
		body: ReplyToPostNotificationRoute.settingDisable.entrypoint,
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
