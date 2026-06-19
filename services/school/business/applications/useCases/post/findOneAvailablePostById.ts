import { C } from "@duplojs/utils";
import { findOneAvailablePostById } from "@domains/aggregates/post/findOneAvailablePostById";
import { PostPort } from "@applications/ports/post";
import type { Post } from "@domains/entities/post";

interface Input {
	postId: Post.Id;
}

export const FindOneAvailablePostById = C.createUseCase(
	{ PostPort },
	({ postPort }) => async(input: Input) => findOneAvailablePostById(
		await postPort.findOneAvailableById(input.postId),
	),
);
