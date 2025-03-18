import { type ArticleType } from "@business/domains/common/articleType";
import { type Provider } from "@business/domains/common/provider";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface GetPageParams {
	provider: Provider;
	articleType: ArticleType;
	pageConcurence?: number;
}

export interface SearchResultProviderRepository extends RepositoryBase<SearchResultEntity> {
	findSearchResultAt(searchDate: Date, params: GetPageParams): AsyncGenerator<SearchResultEntity>;
}

export const searchResultProviderRepository = createRepositoryHandler<
	SearchResultProviderRepository
>();
