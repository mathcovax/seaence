import { C } from "@duplojs/utils";
import type { PostRepository } from "@domains/repositories/post";
import type { BaseRepositoryPort } from "@applications/ports/types";
import type { Post } from "@domains/entities/post";

export interface FindManyPostByNodeSameRawDocumentParams {
	nodeSameRawDocumentId: Post.NodeSameRawDocumentId;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export interface PostPort extends PostRepository, BaseRepositoryPort<Post.Entity> {
	findOneById(id: Post.Id): Promise<C.Maybe<Post.Entity>>;
	findOldestUnprocessed(): Promise<C.Maybe<Post.Entity & Post.Unprocessed>>;
	findManyByNodeSameRawDocument(
		params: FindManyPostByNodeSameRawDocumentParams
	): Promise<Post.Entity[]>;
	getTotalCountByNodeSameRawDocument(
		nodeSameRawDocumentId: Post.NodeSameRawDocumentId
	): Promise<C.PositiveInt>;
	getTotalCountOfUnprocessed(): Promise<C.PositiveInt>;
}

export const PostPort = C.createPort<PostPort>();
