import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { type Provider } from "@business/domains/common/provider";
import { SearchResultEntity, type SearchResultReference } from "@business/domains/entities/searchResult";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	reference: SearchResultReference;
}

export class AddOneSearchResultUsecase extends UsecaseHandler.create({
	scienceDatabaseRepository,
	searchResultRepository,
}) {
	public async execute({ provider, reference }: Input) {
		const referenceIsValid = await this.scienceDatabaseRepository
			.searchResultReferenceIsValid(provider, reference);

		if (!referenceIsValid) {
			return new UsecaseError(
				"search-result-reference-is-not-valid",
				{
					provider,
					reference,
				},
			);
		}

		const searchResult = SearchResultEntity.create({
			provider,
			reference,
		});

		return this.searchResultRepository.save(searchResult);
	}
}
