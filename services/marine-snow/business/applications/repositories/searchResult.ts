import { type Provider } from "@business/domains/common/provider";
import { type SearchResultReference, type SearchResultEntity } from "@business/domains/entities/searchResult";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface SearchResultRepository extends RepositoryBase<SearchResultEntity> {
	delete(searchResult: SearchResultEntity): Promise<void>;
	findOneByProviderAndReference(
		provider: Provider,
		reference: SearchResultReference
	): Promise<SearchResultEntity | null>;
}

export const searchResultRepository = createRepositoryHandler<
	SearchResultRepository
>();
