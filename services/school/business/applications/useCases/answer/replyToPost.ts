import { C, E } from "@duplojs/utils";
import { replyToPost } from "@domains/aggregates/replyToPost";
import { AnswerPort } from "@applications/ports/answer";
import { PostPort } from "@applications/ports/post";
import type { Answer } from "@domains/entities/answer";
import type { UserId, UserName } from "@domains/common/user";
import type { Post } from "@domains/entities/post";

interface Input {
	post: (
		| Post.Entity & Post.Compliant
		| Post.Entity & Post.Unprocessed
	);
	content: Answer.Content;
	authorId: UserId;
	authorName: UserName;
}

export const ReplyToPostUseCase = C.createUseCase(
	{
		AnswerPort,
		PostPort,
	},
	({ answerPort, postPort }) => async(input: Input) => {
		const result = replyToPost({
			...input,
			id: answerPort.generateId(),
			postAnswerCount: await postPort.getAnswerCount(input.post),
		});

		if (E.isLeft(result)) {
			return result;
		}

		const { answer, post } = E.unwrapRight(result);

		const [savedAnswer, savedPost] = await Promise.all([
			answerPort.save(answer),
			postPort.save(post),
		]);

		return E.right("reply-post", {
			answer: savedAnswer,
			post: savedPost,
		});
	},
);
