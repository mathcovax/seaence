import { type Provider } from "@business/domains/common/provider";
import { type ArticleReference, type ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindTheFirstOnesOptions {
	ignoreFailded?: boolean;
}

export interface ArticleReferenceRepository extends RepositoryBase<ArticleReferenceEntity> {
	findOne(
		provider: Provider,
		reference: ArticleReference.Value
	): Promise<ArticleReferenceEntity | null>;
	delete(articleReference: ArticleReferenceEntity): Promise<void>;
	findTheFirstOnes(
		quantity: Int,
		options?: FindTheFirstOnesOptions
	): Promise<ArticleReferenceEntity[]>;
}

export const articleReferenceRepository = createRepositoryHandler<
	ArticleReferenceRepository
>();
