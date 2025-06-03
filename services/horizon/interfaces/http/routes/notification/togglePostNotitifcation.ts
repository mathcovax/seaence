import { iWantPostExistById } from "@interfaces/http/checkers/post";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { BottleAPI } from "@interfaces/providers/bottle";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/toggle-post-notification")
	.extract({
		body: {
			postId: zod.string(),
			enable: zod.boolean(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user, post, enable } = pickup(["user", "post", "enable"]);

			const notificationOfPostStatus = await BottleAPI
				.findNotificationSettingsToPost({
					userId: user.id,
					postId: post.id,
				})
				.then(
					({ information }) => match(information)
						.with(
							"replyPostNotificationSettings.found",
							() => true,
						)
						.with(
							"replyToPostNotificationSettings.notfound",
							() => false,
						)
						.exhaustive(),
				);

			if (enable === notificationOfPostStatus) {
				return new OkHttpResponse("togglePostNotification.noChange");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(OkHttpResponse, "togglePostNotification.noChange"),
	)
	.handler(
		async(pickup) => {
			const { user, post, enable } = pickup(["user", "post", "enable"]);
			if (enable) {
				await BottleAPI.enableNotificationToPost({
					userId: user.id,
					postId: post.id,
				});
				return new OkHttpResponse("togglePostNotification.enabled");
			} else {
				await BottleAPI.disableNotificationToPost({
					userId: user.id,
					postId: post.id,
				});
				return new OkHttpResponse("togglePostNotification.disabled");
			}
		},
		makeResponseContract(OkHttpResponse, ["togglePostNotification.enabled", "togglePostNotification.disabled"]),
	);
