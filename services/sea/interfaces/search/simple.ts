import { elastic } from "@interfaces/providers/elastic";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";
import { buildFilters, type FiltersValues } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { type Document } from "@interfaces/providers/elastic/indexes/document";
import { removeElasticRequestFields } from "@interfaces/utils/removeElasticRequestFields";

export interface SimpleSearchParams {
	language: Language;
	page: number;
	term: string;
	quantityPerPage: number;
	filtersValues?: FiltersValues;
}

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
		title?: string[];
		abstract?: string[];
		keywords?: string[];
		authors?: string[];
	};
}

interface BuildSimpleSearchQueryParams {
	language: Language;
	term: string;
	filtersValues?: FiltersValues;
}

export function buildSimpleSearchQuery(
	{
		language,
		term,
		filtersValues,
	}: BuildSimpleSearchQueryParams,
) {
	return {
		__id: "simpleSearchQuery",
		bool: {
			should: [
				{
					multi_match: {
						query: term,
						fields: [
							"title^3",
							"abstract",
							"keywords^10",
							"authors^10",
						],
					},
				},
			],
			...(filtersValues && buildFilters(language, filtersValues)),
		},
	} satisfies estypes.QueryDslQueryContainer & { __id: "simpleSearchQuery" };
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
		filtersValues,
		language,
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
				title: {},
				abstract: {
					fragment_size: 50,
				},
				keywords: {},
				authors: {},
			},
		},
	});
}
