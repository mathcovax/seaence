import { postIdObjecter } from "@business/domains/common/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { activateReplyToPostNotificationSettingsToPostUsecase, findReplyToPostNotificationSettingsToUserByPostIdUsecase } from "@interfaces/usecases";
import { IWantUserExistsById } from "../checkers/user";
import { endpointFindReplyToPostNotificationSettings } from "../schemas/notificationSettings";

useBuilder()
	.createRoute("POST", "/activate-reply-post-notification-settings")
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

			await activateReplyToPostNotificationSettingsToPostUsecase.execute(
				{
					user,
					postId,
				},
			);

			return new OkHttpResponse("replyPostNotification.activate");
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.activate"),
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
	.handler(
		async(pickup) => {
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

			return new OkHttpResponse("replyPostNotification.found", replyToPostNotificationSettings);
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.found", endpointFindReplyToPostNotificationSettings),
	);
