import { type Language } from "@interfaces/providers/elastic/common/language";
import { type AvailableField, type Document } from "@interfaces/providers/elastic/indexes/document";
import { type OperatorContent } from "@vendors/types-advanced-query";
import { buildFilters, type FiltersValues } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { match } from "ts-pattern";
import { elastic } from "@interfaces/providers/elastic";
import { buildSimpleSearchQuery } from "./simple";
import { buildAdvencedSearchQuery } from "./advenced";
import { type ExpectType } from "@duplojs/utils";
import { removeElasticRequestFields } from "@interfaces/utils/removeElasticRequestFields";
import { highlightTitle } from "./highlight/title";

interface SearchResponse {
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
		[Props in Extract<
			AvailableField,
			| "title.stemmed"
			| "abstract.stemmed"
			| "keywords"
			| "authors.strict"
			| "keywords.strict"
			| "abstract.strict"
			| "title.strict"
		>]?: string[]
	};
}

interface SearchParams {
	language: Language;
	term: OperatorContent | string;
	page: number;
	quantityPerPage: number;
	filtersValues?: FiltersValues;
}

const source = [
	"bakedDocumentId",
	"title",
	"articleTypes",
	"authors",
	"summary",
	"webPublishDate",
	"journalPublishDate",
] as const satisfies (keyof Hit["_source"])[];

type _ExpectSourceHasAllKey = ExpectType<
	typeof source[number],
	keyof Hit["_source"],
	"strict"
>;

export function search(
	{
		language,
		term,
		page,
		quantityPerPage,
		filtersValues,
	}: SearchParams,
) {
	const elasticIndex = match(language)
		.with("fr-FR", () => elastic.frFrDocument)
		.with("en-US", () => elastic.enUsDocument)
		.exhaustive();

	const buildedFilters = filtersValues && buildFilters(language, filtersValues);

	const query = typeof term === "string"
		? buildSimpleSearchQuery({
			term,
			buildedFilters,
		})
		: buildAdvencedSearchQuery({
			term,
			buildedFilters,
		});

	removeElasticRequestFields(query);

	return elasticIndex
		.find<SearchResponse>({
			from: page * quantityPerPage,
			size: quantityPerPage,
			track_total_hits: false,
			_source: source,
			query,
			highlight: {
				type: "unified",
				pre_tags: ["<strong class=\"matching-result\">"],
				post_tags: ["</strong>"],
				fields: {
					"title.stemmed": {
						fragment_size: 1,
						pre_tags: [""],
						post_tags: [""],
					},
					"title.strict": {
						fragment_size: 1,
						pre_tags: [""],
						post_tags: [""],
					},
					"abstract.stemmed": {
						fragment_size: 50,
					},
					"abstract.strict": {
						fragment_size: 50,
						pre_tags: ["<strong class=\"matching-result-strict\">"],
						post_tags: ["</strong>"],
					},
					keywords: {},
					"keywords.strict": {
						pre_tags: ["<strong class=\"matching-result-strict\">"],
						post_tags: ["</strong>"],
					},
					"authors.strict": {
						pre_tags: ["<strong class=\"matching-result-strict\">"],
						post_tags: ["</strong>"],
					},

				} satisfies Record<keyof Exclude<Hit["highlight"], undefined>, estypes.SearchHighlightField>,
			},
		})
		.then(
			(result) => ({
				...result,
				hits: {
					...result.hits,
					hits: result.hits.hits.map(
						({ highlight, ...rest }) => ({
							highlight: {
								title: highlightTitle({
									strict: highlight?.["title.strict"],
									stamed: highlight?.["title.stemmed"],
									source: rest._source.title,
								}),
								abstract: [
									...(highlight?.["abstract.strict"] ?? []),
									...(highlight?.["abstract.stemmed"] ?? []),
								],
								keywords: [
									...(highlight?.["keywords.strict"] ?? []),
									...(highlight?.keywords ?? []),
								],
								authors: highlight?.["authors.strict"],
							},
							...rest,
						}),
					),
				},
			}),
		);
}
