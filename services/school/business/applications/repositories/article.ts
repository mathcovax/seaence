import { type ArticleEntity, type ArticleId } from "@business/domains/entities/article";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface ArticleRepository extends RepositoryBase<ArticleEntity> {
	findOneById(articleId: ArticleId): Promise<ArticleEntity | null>;
}

export const articleRepository = createRepositoryHandler<ArticleRepository>();
