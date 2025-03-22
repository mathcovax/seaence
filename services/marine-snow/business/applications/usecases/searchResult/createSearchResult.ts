import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { type ArticleType } from "@business/domains/common/articleType";
import { type Provider } from "@business/domains/common/provider";
import { type Url } from "@business/domains/common/url";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	url: Url;
	articleType: ArticleType;
}

export const createSearchResultUsecase = createUsecaseHandler(
	"createSearchResult",
	{
		searchResultRepository,
	},
	(
		{ searchResultRepository },
		{ provider, url, articleType }: Input,
	) => {
		const searchResult = SearchResultEntity.create({
			provider,
			url,
			articleType,
		});

		return searchResultRepository.save(searchResult);
	},
);
