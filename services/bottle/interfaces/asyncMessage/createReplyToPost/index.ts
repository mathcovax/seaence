import { postIdObjecter } from "@business/domains/common/post";
import { summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { usernameObjecter } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { createReplyToPostNotificationsUsecase } from "@interfaces/usecases";

asyncMessage.collections.createReplyToPost.on(
	async(createReplyToPostValue) => {
		const postId = postIdObjecter.unsafeCreate(createReplyToPostValue.value.postId);
		const usernameOfReplyPost = usernameObjecter.unsafeCreate(
			createReplyToPostValue.value.usernameOfReplyPost,
		);
		const summaryOfReplyPost = summaryOfReplyPostObjecter.unsafeCreate(
			createReplyToPostValue.value.summaryOfReplyPost,
		);

		await createReplyToPostNotificationsUsecase.execute({
			postId,
			usernameOfReplyPost,
			summaryOfReplyPost,
		});
	},
);

await asyncMessage
	.collections
	.createReplyToPost
	.start(true);
