import { postIdObjecter } from "@business/domains/common/post";
import { summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { createReplyToPostNotificationsUsecase } from "@interfaces/usecases";
import { summarizeText } from "@interfaces/utils/summarizeText";

asyncMessage.collections.createAnswer.on(
	async(createdAnswer) => {
		const postId = postIdObjecter.unsafeCreate(createdAnswer.value.postId);
		const usernameOfReplyPost = usernameObjecter.unsafeCreate(
			createdAnswer.value.author.username,
		);
		const summaryOfReplyPost = summaryOfReplyPostObjecter.unsafeCreate(
			summarizeText(createdAnswer.value.content),
		);
		const userIdOfReplyPost = userIdObjecter.unsafeCreate(createdAnswer.value.author.id);

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
	.createAnswer
	.start(true);
