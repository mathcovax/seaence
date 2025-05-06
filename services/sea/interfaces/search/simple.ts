import { elastic } from "@interfaces/providers/elastic";
import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";
import { buildFacetsAggregations, buildFilters, type FiltersValues, type AggregationsResults } from "./facet";

export interface SimpleSearchParams {
	language: Language;
	page: number;
	term: string;
	quantityPerPage: number;
	filtersValues?: FiltersValues;
}

interface SimpleSearchResponse {
	took: number;
	timed_out: boolean;
	_shards: {
		total: number;
		successful: number;
		skipped: number;
		failed: number;
	};
	hits: {
		total: {
			value: number;
			relation: string;
		};
		max_score: number;
		hits: Hit[];
	};
	aggregations: AggregationsResults;
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
		_source: ["abysBakedDocumentId", "title", "summary", "authors", "articleTypes", "webPublishDate", "journalPublishDate"],
		query: {
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
				...(filtersValues && buildFilters(filtersValues)),
			},
		},
		highlight: {
			fields: {
				title: {},
				abstract: {
					fragment_size: 50,
				},
				keywords: {},
				authors: {},
			},
		},
		aggregations: buildFacetsAggregations(language),
	});
}
