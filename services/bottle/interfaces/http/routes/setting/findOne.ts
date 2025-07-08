import { iWantReplyToPostNotificationSettingExist } from "@interfaces/http/checkers/notificationSetting/replyToPost";
import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { EndpointNotificationSetting, EntrypointNotificationSetting } from "@interfaces/http/schemas/setting";

useBuilder()
	.createRoute("POST", "/notification-reply-to-post-setting-find-one")
	.extract({
		body: EntrypointNotificationSetting.replyToPostFindOne,
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
		makeResponseContract(OkHttpResponse, "replyPostNotificationSetting.found", EndpointNotificationSetting.replyToPostFindOne),
	);
