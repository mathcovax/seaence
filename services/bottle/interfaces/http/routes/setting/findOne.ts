import { iWantReplyToPostNotificationSettingExist } from "@interfaces/http/checkers/notificationSetting/replyToPost";
import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { ReplyToPostNotificationRoute } from "@interfaces/http/schemas/notification/replyToPost";

useBuilder()
	.createRoute("POST", "/notification-reply-to-post-setting-find-one")
	.extract({
		body: ReplyToPostNotificationRoute.settingFindOne.entrypoint,
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
		makeResponseContract(OkHttpResponse, "replyPostNotificationSetting.found", ReplyToPostNotificationRoute.settingFindOne.endpoint),
	);
