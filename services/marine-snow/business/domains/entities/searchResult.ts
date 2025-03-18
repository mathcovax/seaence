import { createEntityHandler, type GetEntity } from "@vendors/clean";
import { type Provider, providerObjecter } from "../common/provider";
import { type Url, urlObjecter } from "../common/url";
import { articleTypeObjecter, type ArticleType } from "../common/articleType";

export interface SearchResultEntityInput {
	provider: Provider;
	url: Url;
	articleType: ArticleType;
}

export const searchResultEntityHandler = createEntityHandler(
	"searchResult",
	{
		provider: providerObjecter,
		url: urlObjecter,
		articleType: articleTypeObjecter,
	},
);

export type SearchResultEntity = GetEntity<typeof searchResultEntityHandler>;
