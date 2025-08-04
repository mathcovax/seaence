import { type Provider } from "@business/domains/common/provider";
import { type ArticleReferenceEntity, type ArticleReference } from "@business/domains/entities/articleReference";
import { createRepositoryHandler, type RepositoryError, type RepositoryBase, type DateYYYYMMDDInterval, type DateYYYYMMDD, type Int, type TechnicalError } from "@vendors/clean";

type FetchPubmedArticleReferenceResult = AsyncGenerator<
	& {
		date: DateYYYYMMDD;
		page: Int;
	}
	& (
		| {
			success: true;
			references: ArticleReference.Value[];
		}
		| {
			success: false;
			error: RepositoryError;
		}
	)
>;

type ExportArticleReferencesResult = Promise<
	{
		successExportArticleReferences: ArticleReferenceEntity[];
		failedExportArticleReferences: RepositoryError<"failed-to-export-article-reference", {
			articleReference: ArticleReferenceEntity;
			error: TechnicalError;
		}>[];
	}
>;

export interface ScienceDatabaseRepository extends RepositoryBase<never> {
	articleReferenceValueExist(provider: Provider, value: ArticleReference.Value): Promise<boolean>;
	fetchPubmedArticleReferences(interval: DateYYYYMMDDInterval): FetchPubmedArticleReferenceResult;
	exportArticleReferences(articleReferences: ArticleReferenceEntity[]): ExportArticleReferencesResult;
}

export const scienceDatabaseRepository = createRepositoryHandler<
	ScienceDatabaseRepository
>();
