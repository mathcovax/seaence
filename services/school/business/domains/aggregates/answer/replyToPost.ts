/* eslint-disable @typescript-eslint/no-magic-numbers */
import { C, D, E, pipe } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { Post } from "@domains/entities/post";
import type { AnswerRepository } from "@domains/repositories/answer";
import type { PostRepository } from "@domains/repositories/post";
import type { UserId, UserName } from "@domains/common/user";

interface ReplyToPostParams {
	id: C.GetEvidenceResult<AnswerRepository["generateId"], "generated">;
	post: Post.AvailableEntity;
	postAnswerCount: C.GetEvidenceResult<PostRepository["getAnswerCount"], "count">;
	content: Answer.Content;
	authorId: UserId;
	authorName: UserName;
}

const defaultAnswerStatus = Answer.Status.createOrThrow("unprocessed");

export function replyToPost(params: ReplyToPostParams) {
	return E.rightPipe(
		E.group({
			answerCreatedAt: Answer.CreatedAt.create(D.now()),
			postAnswerCount: pipe(
				params.postAnswerCount,
				C.add(1),
				Post.AnswerCount.create,
			),
		}),
		({ answerCreatedAt, postAnswerCount }) => {
			const post = Post.Entity.update(
				params.post,
				{ answerCount: postAnswerCount },
			);

			return {
				post,
				answer: Answer.Entity.new({
					id: params.id,
					postId: params.post.id,
					authorId: params.authorId,
					authorName: params.authorName,
					content: params.content,
					status: defaultAnswerStatus,
					createdAt: answerCreatedAt,
				}),
			};
		},
	);
}
