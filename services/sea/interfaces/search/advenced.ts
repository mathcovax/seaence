import { type Language } from "@interfaces/providers/elastic/common/language";
import { type FiltersValues } from "./facet";
import { type OperatorContent } from "@vendors/types-advanced-query";
import { elastic } from "@interfaces/providers/elastic";
import { match } from "ts-pattern";

export function buildAdvencedSearchQuery() {

}

interface AdvancedSearchParams {
	language: Language;
	page: number;
	term: OperatorContent;
	quantityPerPage: number;
	filtersValues?: FiltersValues;
}

export function advencedSearch(
	{
		language,
		term,
		filtersValues,
		quantityPerPage,
		page,
	}: AdvancedSearchParams,
) {
	const elasticIndex = match(language)
		.with("fr-FR", () => elastic.frFrDocument)
		.with("en-US", () => elastic.enUsDocument)
		.exhaustive();
}
