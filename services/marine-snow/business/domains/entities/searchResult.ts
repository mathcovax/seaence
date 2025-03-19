import { createEntityHandler, type GetEntity } from "@vendors/clean";
import { providerObjecter } from "../common/provider";
import { urlObjecter } from "../common/url";
import { articleTypeObjecter } from "../common/articleType";

export const searchResultEntityHandler = createEntityHandler(
	"searchResult",
	{
		provider: providerObjecter,
		url: urlObjecter,
		articleType: articleTypeObjecter,
	},
);

export type SearchResultEntity = GetEntity<typeof searchResultEntityHandler>;
