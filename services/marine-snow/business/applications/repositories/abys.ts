import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AbysRepository extends RepositoryBase<never> {
	sendSearchResults(searchResult: SearchResultEntity[]): Promise<SearchResultEntity[]>;
}

export const abysRepository = createRepositoryHandler<
	AbysRepository
>();
