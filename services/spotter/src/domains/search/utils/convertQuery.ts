import type {
	ArticleType,
	FiltersValues,
	GenderFacetValue,
	SpeciesFacetValue,
} from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { ZodObject } from "zod";
import type { searchPageQuery } from "../router";
import type { SearchParams } from "@/lib/horizon/types/search";
import { operatorContentSchema } from "@vendors/types-advanced-query";

export type SearchPageQueryInput = ZodObject<typeof searchPageQuery>["_input"];
export type SearchPageQueryOutput = ZodObject<typeof searchPageQuery>["_output"];

export interface QueryFilters {
	articleType?: ArticleType[];
	gender?: GenderFacetValue[];
	species?: SpeciesFacetValue[];
	year?: [number, number];
}

const queryYearIndex = {
	from: 0,
	to: 1,
};

type SearchPage = typeof simpleSearchPage | typeof advancedSearchPage;

function getCorrectQueryTerm(
	currentSearchPage: SearchPage,
	term: SearchPageQueryOutput["term"],
): SearchParams["term"] {
	if (currentSearchPage === simpleSearchPage) {
		return term;
	}
	try {
		const result = operatorContentSchema.parse(
			JSON.parse(term),
		);

		return result;
	} catch {
		return {
			type: "operator",
			name: "and",
			content: [
				{
					type: "comparator",
					name: "text",
					field: "allField",
					value: "",
				},
			],
		};
	}
}

export function convertQueryToSearchParams(
	currentSearchPage: SearchPage,
	query: SearchPageQueryOutput,
): Required<SearchParams> {
	return {
		term: getCorrectQueryTerm(currentSearchPage, query.term),
		page: query.page,
		language: query.language,
		filtersValues: {
			articleType: query.articleType,
			gender: query.gender,
			species: query.species,
			year: query.year && {
				from: query.year[queryYearIndex.from],
				to: query.year[queryYearIndex.to],
			},
		},
	};
}

export function convertSearchParamsToQuery(
	{
		term,
		page,
		language,
		filtersValues,
	}: SearchParams,
): SearchPageQueryInput {
	return {
		term,
		page,
		language,
		articleType: filtersValues?.articleType,
		gender: filtersValues?.gender,
		species: filtersValues?.species,
		year: filtersValues?.year && [
			filtersValues.year.from,
			filtersValues.year.to,
		],
	};
}
