import { bakedDocumentSearchResultObjecter } from "@business/entities/bakedDocumentSearchResult";
import { searchConfig } from "@interfaces/configs/search";

export const endpointSimpleSearchResultSchema = bakedDocumentSearchResultObjecter.zodSchema;

export const simpleSearchTermSchema = zod.string()
	.max(searchConfig.simple.maxLength)
	.min(searchConfig.simple.minLength);
