import { postIdObjecter } from "@business/domains/common/post";
import { summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { createReplyToPostNotificationsUsecase } from "@interfaces/usecases";
import { summarizeText } from "@interfaces/utils/summarizeText";

asyncMessage.collections.createReplyToPost.on(
	async(createReplyToPostValue) => {
		const postId = postIdObjecter.unsafeCreate(createReplyToPostValue.value.postId);
		const usernameOfReplyPost = usernameObjecter.unsafeCreate(
			createReplyToPostValue.value.author.username,
		);
		const summaryOfReplyPost = summaryOfReplyPostObjecter.unsafeCreate(
			summarizeText(createReplyToPostValue.value.content),
		);
		const userIdOfReplyPost = userIdObjecter.unsafeCreate(createReplyToPostValue.value.author.id);

		await createReplyToPostNotificationsUsecase.execute({
			postId,
			userIdOfReplyPost,
			usernameOfReplyPost,
			summaryOfReplyPost,
		});
	},
);

await asyncMessage
	.collections
	.createReplyToPost
	.start(true);
