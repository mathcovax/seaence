import { elastic } from "@interfaces/providers/elastic";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";
import { buildFilters, type FiltersValues } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { type Document } from "@interfaces/providers/elastic/indexes/document";
import { removeElasticRequestFields } from "@interfaces/utils/removeElasticRequestFields";

interface SimpleSearchResponse {
	hits: {
		hits: Hit[];
	};
}

interface Hit {
	_index: string;
	_id: string;
	_score: number;
	_source: Pick<
		Document,
		| "bakedDocumentId"
		| "title"
		| "summary"
		| "authors"
		| "articleTypes"
		| "webPublishDate"
		| "journalPublishDate"
	>;
	highlight?: {
		"title.stemmed"?: string[];
		"abstract.stemmed"?: string[];
		keywords?: string[];
		"authors.strict"?: string[];
	};
}

interface BuildSimpleSearchQueryParams {
	term: string;
	builedFilters?: ReturnType<typeof buildFilters>;
}

export function buildSimpleSearchQuery(
	{
		term,
		builedFilters,
	}: BuildSimpleSearchQueryParams,
) {
	return {
		__id: "simpleSearchQuery",
		bool: {
			should: [
				{
					multi_match: {
						query: term,
						type: "phrase",
						fields: [
							"title.stemmed^10",
							"abstract.stemmed^5",
						],
						slop: 3,
					},
				},
				{
					multi_match: {
						query: term,
						fields: [
							"title.stemmed^3",
							"abstract.stemmed",
							"keywords^10",
						],
					},
				},
				{
					match: {
						"authors.strict": {
							query: term,
							boost: 20,
						},
					},
				},
			],
			...builedFilters,
		},
	} satisfies estypes.QueryDslQueryContainer & { __id: "simpleSearchQuery" };
}

export interface SimpleSearchParams {
	language: Language;
	page: number;
	term: string;
	quantityPerPage: number;
	filtersValues?: FiltersValues;
}

export function simpleSearch(
	{
		language,
		page,
		term,
		quantityPerPage,
		filtersValues,
	}: SimpleSearchParams,
) {
	const elasticIndex = match(language)
		.with("fr-FR", () => elastic.frFrDocument)
		.with("en-US", () => elastic.enUsDocument)
		.exhaustive();

	const query = buildSimpleSearchQuery({
		term,
		builedFilters: filtersValues && buildFilters(language, filtersValues),
	});

	removeElasticRequestFields(query);

	return elasticIndex.find<SimpleSearchResponse>({
		from: page * quantityPerPage,
		size: quantityPerPage,
		track_total_hits: false,
		_source: ["bakedDocumentId", "title", "summary", "authors", "articleTypes", "webPublishDate", "journalPublishDate"],
		query,
		highlight: {
			pre_tags: ["<strong class=\"matching-result\">"],
			post_tags: ["</strong>"],
			fields: {
				"title.stemmed": {},
				"abstract.stemmed": {
					fragment_size: 50,
				},
				keywords: {},
				"authors.strict": {},

			} satisfies Record<keyof Exclude<Hit["highlight"], undefined>, estypes.SearchHighlightField>,
		},
	});
}
