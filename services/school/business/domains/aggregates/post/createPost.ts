/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type C, D, pipe } from "@duplojs/utils";
import type { UserName, UserId } from "../../common/user";
import { Post } from "../../entities/post";
import { NotificationSetting } from "../../entities/notificationSetting";
import type { PostRepository } from "../../repositories/post";

interface CreatePostParams {
	id: C.GetEvidenceResult<PostRepository["generateId"], "generated">;
	nodeSameRawDocumentId: Post.NodeSameRawDocumentId;
	authorId: UserId;
	authorName: UserName;
	topic: Post.Topic;
	content: Post.Content;
}

const defaultPostAnswerCount = Post.AnswerCount.createOrThrow(0);
const defaultPostStatus = Post.Status.createOrThrow("unprocessed");

export function createPost(params: CreatePostParams) {
	const post = pipe(
		Post.Entity.new({
			...params,
			answerCount: defaultPostAnswerCount,
			status: defaultPostStatus,
			createdAt: Post.CreatedAt.createOrThrow(D.now()),
		}),
		Post.Unprocessed.append,
	);

	const notificationSetting = NotificationSetting.Entity.new({
		postId: post.id,
		userId: post.authorId,
	});

	return {
		post,
		notificationSetting,
	};
}
