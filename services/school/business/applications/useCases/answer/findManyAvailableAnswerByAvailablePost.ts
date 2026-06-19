import { C } from "@duplojs/utils";
import { findManyAvailableAnswerByAvailablePost } from "@domains/aggregates/answer/findManyAvailableAnswerByAvailablePost";
import { AnswerPort } from "@applications/ports/answer";
import type { Post } from "@domains/entities/post";

interface Input {
	post: Post.AvailableEntity;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export const FindManyAvailableAnswerByAvailablePost = C.createUseCase(
	{ AnswerPort },
	({ answerPort }) => async(input: Input) => findManyAvailableAnswerByAvailablePost(
		await answerPort.findManyAvailableByAvailablePost(input),
	),
);
