import { C } from "@duplojs/utils";
import { findOldestUnprocessedPost } from "@domains/aggregates/post/findOldestUnprocessedPost";
import { PostPort } from "@applications/ports/post";

export const FindOldestUnprocessedPost = C.createUseCase(
	{ PostPort },
	({ postPort }) => async() => findOldestUnprocessedPost(
		await postPort.findOldestUnprocessed(),
	),
);
