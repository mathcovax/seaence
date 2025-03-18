import { type Provider } from "@business/domains/common/provider";
import { createUsecaseHandler } from "@vendors/clean";
import { searchResultProviderRepository } from "../repositories/searchResultProvider";
import { type ArticleType } from "@business/domains/common/articleType";
import { searchResultRepository } from "../repositories/searchResult";

interface Input {
	provider: Provider;
	searchDate: Date;
	articleType: ArticleType;
}

const quantityGetPageInSameTime = 20;

export const importOneDaySearchResultsFromProviderUsecase = createUsecaseHandler(
	"importOneDaySearchResultsFromProvider",
	{
		searchResultProviderRepository,
		searchResultRepository,
	},
	async(
		{ searchResultProviderRepository, searchResultRepository },
		{ provider, searchDate, articleType }: Input,
	) => {
		const upComingSearchResult = searchResultProviderRepository.findSearchResultAt(
			searchDate,
			{
				provider,
				articleType,
				pageConcurence: quantityGetPageInSameTime,
			},
		);

		for await (const searchResultProvided of upComingSearchResult) {
			await searchResultRepository.importSearchResultFromProvider(
				searchResultProvided,
			);
		}
	},
);
