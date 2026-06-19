import type { C } from "@duplojs/utils";
import type { Post } from "../entities/post";

interface FindManyAvailablePostByNodeSameRawDocumentParams {
	nodeSameRawDocumentId: Post.NodeSameRawDocumentId;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export interface PostRepository {
	generateId(): Post.Id & C.Evidence<"generated">;
	getAnswerCount(entity: Post.Entity): Promise<C.PositiveInt & C.Evidence<"count">>;
	findOneAvailableById(id: Post.Id): Promise<C.Maybe<Post.AvailableEntity> & C.Evidence<"one-available">>;
	findOldestUnprocessed(): Promise<C.Maybe<Post.Entity & Post.Unprocessed> & C.Evidence<"oldest-unprocessed">>;
	findManyAvailableByNodeSameRawDocument(
		params: FindManyAvailablePostByNodeSameRawDocumentParams
	): Promise<{ posts: Post.AvailableEntity[] } & C.Evidence<"many-available">>;
}
