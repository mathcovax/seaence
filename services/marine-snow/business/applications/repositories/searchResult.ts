import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SearchResultRepository extends RepositoryBase<SearchResultEntity> {
	importSearchResultFromProvider(entity: SearchResultEntity): Promise<void>;
}

export const searchResultRepository = createRepositoryHandler<
	SearchResultRepository
>();
