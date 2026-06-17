/* eslint-disable @typescript-eslint/no-magic-numbers */
import { C, D, E, pipe } from "@duplojs/utils";
import type { AnswerRepository } from "../repositories/answer";
import type { PostRepository } from "../repositories/post";
import { Answer } from "../entities/answer";
import type { UserId, UserName } from "../common/user";
import { Post } from "../entities/post";

interface ReplyToPostParams {
	id: C.GetEvidenceResult<AnswerRepository["generateId"], "generated">;
	post: Post.Entity & Post.Compliant;
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
			const answer = pipe(
				Answer.Entity.new({
					id: params.id,
					postId: params.post.id,
					authorId: params.authorId,
					authorName: params.authorName,
					content: params.content,
					status: defaultAnswerStatus,
					createdAt: answerCreatedAt,
				}),
				Answer.Unprocessed.append,
			);

			const updatedPost = pipe(
				params.post,
				Post.Entity.update({
					answerCount: postAnswerCount,
				}),
				Post.Compliant.append,
			);

			return E.right("reply-post", {
				answer,
				post: updatedPost,
			});
		},
	);
}
