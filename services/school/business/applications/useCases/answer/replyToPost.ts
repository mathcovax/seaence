import { C, E, promiseObject } from "@duplojs/utils";
import { replyToPost } from "@domains/aggregates/answer/replyToPost";
import { AnswerPort } from "@applications/ports/answer";
import { PostPort } from "@applications/ports/post";
import type { Answer } from "@domains/entities/answer";
import type { UserId, UserName } from "@domains/common/user";
import type { Post } from "@domains/entities/post";

interface Input {
	post: Post.AvailableEntity;
	content: Answer.Content;
	authorId: UserId;
	authorName: UserName;
}

export const ReplyToPostUseCase = C.createUseCase(
	{
		AnswerPort,
		PostPort,
	},
	({ answerPort, postPort }) => async(input: Input) => E.rightAsyncPipe(
		replyToPost({
			...input,
			id: answerPort.generateId(),
			postAnswerCount: await postPort.getAnswerCount(input.post),
		}),
		({ answer, post }) => promiseObject({
			post: postPort.save(post),
			answer: answerPort.save(answer),
		}),
		(result) => E.right("replyPost", result),
	),
);
