import { type Int } from "@business/domains/common/Int";
import { type ArticleId } from "@business/domains/entities/article";
import { type PostId, type PostEntity } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface FindByArticleIdParams {
	page: Int;
	quantityPerPage: Int;
}
export interface PostRepository extends RepositoryBase<PostEntity> {
	generatePostId(): PostId;
	findByArticleId(articleId: ArticleId, params: FindByArticleIdParams): Promise<PostEntity[]>;
	findOneById(postId: PostId): Promise<PostEntity | null>;
}

export const postRepository = createRepositoryHandler<PostRepository>();
