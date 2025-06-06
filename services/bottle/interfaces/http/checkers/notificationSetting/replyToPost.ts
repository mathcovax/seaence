import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { findOneReplyToPostNotificationSettingToUserByPostIdUsecase } from "@interfaces/usecases";

interface Input {
	user: UserEntity;
	postId: PostId;
}

const replyToPostNotificationSettingExistCheck = createChecker("replyToPostNotificationSettingExist")
	.handler(
		async({ user, postId }: Input, output) => {
			const replyToPostNotificationSetting = await findOneReplyToPostNotificationSettingToUserByPostIdUsecase
				.execute({
					user,
					postId,
				});

			if (replyToPostNotificationSetting) {
				return output("replyToPostNotificationSetting.found", replyToPostNotificationSetting);
			} else {
				return output("replyToPostNotificationSetting.notfound", null);
			}
		},
	);

export const iWantReplyToPostNotificationSettingExist = createPresetChecker(
	replyToPostNotificationSettingExistCheck,
	{
		result: "replyToPostNotificationSetting.found",
		catch: () => new NotFoundHttpResponse("replyToPostNotificationSetting.notfound"),
		indexing: "replyToPostNotificationSetting",
	},
	makeResponseContract(NotFoundHttpResponse, "replyToPostNotificationSetting.notfound"),
);
