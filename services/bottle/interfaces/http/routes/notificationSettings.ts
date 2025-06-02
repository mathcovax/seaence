import { postIdObjecter } from "@business/domains/common/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { activateReplyToPostNotificationSettingsToPostUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/activate-reply-post-notification")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			postId: postIdObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, postId } = pickup("body");

			await activateReplyToPostNotificationSettingsToPostUsecase.execute(
				{
					userId,
					postId,
				},
			);

			return new OkHttpResponse("replyPostNotification.activate");
		},
		makeResponseContract(OkHttpResponse, "replyPostNotification.activate"),
	);
