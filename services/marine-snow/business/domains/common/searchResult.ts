import { EntityHandler, type GetValueObject } from "@vendors/clean";
import { SearchResultEntity } from "../entities/searchResult";

export const searchResultObjecter = EntityHandler.createEntityObjecter(
	"searchResult",
	SearchResultEntity,
);

export type SearchResult = GetValueObject<typeof searchResultObjecter>;
