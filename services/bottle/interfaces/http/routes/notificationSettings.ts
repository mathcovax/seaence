import { postIdObjecter } from "@business/domains/common/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { disableReplyToPostNotificationSettingsToPostUsecase, enableReplyToPostNotificationSettingsToPostUsecase, findReplyToPostNotificationSettingsToUserByPostIdUsecase } from "@interfaces/usecases";
import { IWantUserExistsById } from "../checkers/user";
import { endpointFindReplyToPostNotificationSettings } from "../schemas/notificationSettings";

useBuilder()
	.createRoute("POST", "/enable-reply-post-notification-settings")
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
	.createRoute("POST", "/disable-reply-post-notification-settings")
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

			await disableReplyToPostNotificationSettingsToPostUsecase
				.execute(
					{
						user,
						postId,
					},
				);

			return new OkHttpResponse("replyPostNotification.disable");
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.disable"),
	);

useBuilder()
	.createRoute("POST", "/find-reply-to-post-notification-settings")
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
	.cut(
		async({ pickup, dropper }) => {
			const { body: { postId }, user } = pickup(["body", "user"]);

			const replyToPostNotificationSettings = await findReplyToPostNotificationSettingsToUserByPostIdUsecase
				.execute(
					{
						user,
						postId,
					},
				)
				.then(
					(settings) => settings
						? settings.toSimpleObject()
						: null,
				);

			console.log(replyToPostNotificationSettings);

			if (!replyToPostNotificationSettings) {
				return new NotFoundHttpResponse("replyToPostNotificationSettings.notfound");
			}

			return dropper({ replyToPostNotificationSettings });
		},
		["replyToPostNotificationSettings"],
		makeResponseContract(NotFoundHttpResponse, "replyToPostNotificationSettings.notfound"),
	)
	.handler(
		(pickup) => {
			const { replyToPostNotificationSettings } = pickup(["replyToPostNotificationSettings"]);

			return new OkHttpResponse("replyPostNotificationSettings.found", replyToPostNotificationSettings);
		},
		makeResponseContract(OkHttpResponse, "replyPostNotificationSettings.found", endpointFindReplyToPostNotificationSettings),
	);
