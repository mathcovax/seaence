import { type Int } from "@business/domains/common/int";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface SearchResultRepository extends RepositoryBase<SearchResultEntity> {
	selectSearchResultToSendThem(quantity: Int, quantityPerPage: Int): AsyncGenerator<SearchResultEntity[]>;

	delete(searchResult: SearchResultEntity): Promise<void>;
}

export const searchResultRepository = createRepositoryHandler<
	SearchResultRepository
>();
