import { iWantReplyToPostNotificationSettingExist } from "@interfaces/http/checkers/notificationSetting/replyToPost";
import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { EntrypointNotificationSetting } from "@interfaces/http/schemas/setting";
import { disableReplyToPostNotificationSettingToPostUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-reply-post-setting-disable")
	.extract({
		body: EntrypointNotificationSetting.replyPostDisable,
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
