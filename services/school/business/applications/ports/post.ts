import { C } from "@duplojs/utils";
import type { PostRepository } from "@domains/repositories/post";
import type { BaseRepositoryPort } from "@applications/ports/types";
import type { Post } from "@domains/entities/post";

export interface PostPort extends PostRepository, BaseRepositoryPort<Post.Entity> {
	findOneById(id: Post.Id): Promise<C.Maybe<Post.Entity>>;
	getTotalCountAvailableByNodeSameRawDocument(
		nodeSameRawDocumentId: Post.NodeSameRawDocumentId
	): Promise<C.PositiveInt>;
	getTotalCountOfUnprocessed(): Promise<C.PositiveInt>;
}

export const PostPort = C.createPort<PostPort>();
