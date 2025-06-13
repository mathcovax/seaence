import type {
	ArticleType,
	GenderFacetValue,
	OperatorContent,
	SpeciesFacetValue,
} from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { ZodObject } from "zod";
import type { searchPageQuery } from "../router";
import type { SearchParams } from "@/lib/horizon/types/search";
import {
	operatorContentSchema,
} from "@vendors/types-advanced-query";
import { jsonKeyChanger, reverseJsonKeyChanger } from "./jsonKeyChanger";
import { stringCompresor, stringDecompresor } from "./stringCompressor";

export type SearchPageQueryInput = ZodObject<typeof searchPageQuery>["_input"];
export type SearchPageQueryOutput = ZodObject<typeof searchPageQuery>["_output"];

export interface QueryFilters {
	articleType?: ArticleType[];
	gender?: GenderFacetValue[];
	species?: SpeciesFacetValue[];
	year?: [number, number];
}

const keyMapper: Record<string, string> = {
	type: "t",
	name: "n",
	value: "v",
	field: "f",
	content: "c",
};

const queryYearIndex = {
	from: 0,
	to: 1,
};

type SearchPage = typeof simpleSearchPage | typeof advancedSearchPage;

export function getAdvencedDefaultValue(): OperatorContent {
	return {
		type: "operator",
		name: "and",
		content: [
			{
				type: "comparator",
				name: "text",
				field: "allField",
				value: "",
				boost: "1",
			},
		],
	};
}

function queryTermToTerm(
	currentSearchPage: SearchPage,
	term: SearchPageQueryOutput["term"],
): SearchParams["term"] {
	if (currentSearchPage === simpleSearchPage) {
		return term;
	}
	try {
		const result = operatorContentSchema.parse(
			reverseJsonKeyChanger(
				JSON.parse(
					stringDecompresor(term),
				),
				keyMapper,
			),
		);

		return result;
	} catch {
		return getAdvencedDefaultValue();
	}
}

export function convertQueryToSearchParams(
	currentSearchPage: SearchPage,
	query: SearchPageQueryOutput,
): Required<SearchParams> {
	return {
		term: queryTermToTerm(currentSearchPage, query.term),
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

function termToQueryTerm(value: string | OperatorContent): string {
	if (typeof value === "string") {
		return value;
	} else {
		return stringCompresor(
			JSON.stringify(
				jsonKeyChanger(
					value,
					keyMapper,
				),
			),
		);
	}
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
		term: termToQueryTerm(term),
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
