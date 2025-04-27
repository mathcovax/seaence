import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { type Provider } from "@business/domains/common/provider";
import { type SearchResultReference } from "@business/domains/entities/searchResult";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	reference: SearchResultReference;
}

export class FindOneSearchResultUsecase extends UsecaseHandler.create({
	searchResultRepository,
}) {
	public execute({ provider, reference }: Input) {
		return this.searchResultRepository.findOneByProviderAndReference(
			provider,
			reference,
		);
	}
}
