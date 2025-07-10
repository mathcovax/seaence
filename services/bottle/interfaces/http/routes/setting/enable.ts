import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { ReplyToPostNotificationSchema } from "@interfaces/http/schemas/notification/replyToPost";
import { enableReplyToPostNotificationSettingToPostUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-reply-post-setting-enable")
	.extract({
		body: ReplyToPostNotificationSchema.settingEnable.entrypoint,
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
