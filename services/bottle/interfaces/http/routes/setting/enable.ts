import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { EntrypointNotificationSetting } from "@interfaces/http/schemas/setting";
import { enableReplyToPostNotificationSettingToPostUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-reply-post-setting-enable")
	.extract({
		body: EntrypointNotificationSetting.replyPostEnable,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const { body: { postId }, user } = pickup(["body", "user"]);

			await enableReplyToPostNotificationSettingToPostUsecase
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
