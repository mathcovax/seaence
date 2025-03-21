import { type ArticleId } from "@business/domains/entities/article";
import { type PostEntity } from "@business/domains/entities/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface PostRepository extends RepositoryBase<PostEntity> {
	findByArticleId(articleId: ArticleId): Promise<PostEntity[]>;
}

export const postRepository = createRepositoryHandler<PostRepository>();
