import type { C } from "@duplojs/utils";
import type { Post } from "../entities/post";

export interface PostRepository {
	generateId(): Post.Id & C.Evidence<"generated">;
	getAnswerCount(entity: Post.Entity): Promise<C.PositiveInt & C.Evidence<"count">>;
}
