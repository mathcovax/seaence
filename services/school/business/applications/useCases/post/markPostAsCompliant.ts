import { C, E } from "@duplojs/utils";
import { markPostAsCompliant } from "@domains/aggregates/post/markPostAsCompliant";
import { PostPort } from "@applications/ports/post";
import type { Post } from "@domains/entities/post";

interface Input {
	post: Post.Entity & Post.Unprocessed;
}

export const MarkPostAsCompliantUseCase = C.createUseCase(
	{ PostPort },
	({ postPort }) => (input: Input) => E.rightPipe(
		markPostAsCompliant(input.post),
		postPort.save,
	),
);
