import { elastic } from "@interfaces/providers/elastic";
import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";
import { buildFilters, type FiltersValues } from "./facet";
import { type estypes } from "@elastic/elasticsearch";

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
	_source: {
		abysBakedDocumentId: string;
		title: string;
		summary: string | null;
		authors: string[];
		articleTypes: ArticleType[];
		webPublishDate: string | null;
		journalPublishDate: string | null;
	};
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
	} satisfies estypes.QueryDslQueryContainer;
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

	return elasticIndex.find<SimpleSearchResponse>({
		from: page * quantityPerPage,
		size: quantityPerPage,
		track_total_hits: false,
		_source: ["abysBakedDocumentId", "title", "summary", "authors", "articleTypes", "webPublishDate", "journalPublishDate"],
		query: buildSimpleSearchQuery({
			term,
			filtersValues,
			language,
		}),
		highlight: {
			pre_tags: ["<strong class=\"matching-result\">>"],
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
