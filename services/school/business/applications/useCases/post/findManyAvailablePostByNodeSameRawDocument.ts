import { C } from "@duplojs/utils";
import { findManyAvailablePostByNodeSameRawDocument } from "@domains/aggregates/post/findManyAvailablePostByNodeSameRawDocument";
import { PostPort } from "@applications/ports/post";
import type { Post } from "@domains/entities/post";

interface Input {
	nodeSameRawDocumentId: Post.NodeSameRawDocumentId;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export const FindManyAvailablePostByNodeSameRawDocumentUseCase = C.createUseCase(
	{ PostPort },
	({ postPort }) => async(input: Input) => findManyAvailablePostByNodeSameRawDocument(
		await postPort.findManyAvailableByNodeSameRawDocument(input),
	),
);
