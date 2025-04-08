import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryError, type RepositoryBase } from "@vendors/clean";

export interface AbysRepository extends RepositoryBase<never> {
	sendSearchResults(searchResult: SearchResultEntity[]): Promise<SearchResultEntity[] | RepositoryError>;
}

export const abysRepository = createRepositoryHandler<
	AbysRepository
>();
