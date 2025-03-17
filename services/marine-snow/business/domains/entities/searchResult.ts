import { createEntityHandler, type GetEntity } from "@vendors/clean";
import { type Provider, provider } from "../common/provider";
import { createdAt } from "../common/createdAt";
import { type Url, url } from "../common/url";
import { articleType, type ArticleType } from "../common/articleType";

export interface SearchResultEntityInput {
	provider: Provider;
	url: Url;
	articleType: ArticleType;
}

export const searchResultEntityHandler = createEntityHandler(
	"searchResult",
	{
		provider,
		url,
		articleType,
		createdAt,
	},
	{
		constructor(value: SearchResultEntityInput) {
			return {
				...value,
				createdAt: createdAt.unsafeCreate(new Date()),
			};
		},
	},
);

export type SearchResultEntity = GetEntity<typeof searchResultEntityHandler>;
