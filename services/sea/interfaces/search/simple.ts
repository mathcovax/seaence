import { elastic } from "@interfaces/providers/elastic";
import { type ArticleType } from "@interfaces/providers/elastic/common/articleType";
import { type Language } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";
import { facetsAggregations, type AggregationsResults } from "./facet";

export interface SimpleSearchParams {
	language: Language;
	page: number;
	term: string;
	quantityPerPage: number;
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

interface InnerHits<
	GenericFieldsNames extends string,
> {
	hits: {
		hits: {
			_nested: {
				offset: number;
			};
			highlight: {
				[Prop in GenericFieldsNames]: string[];
			};
		}[];
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
		authors: { name: string }[];
		articleTypes: ArticleType[];
		webPublishDate: string | null;
		journalPublishDate: string | null;
	};
	highlight?: {
		title?: string[];
		abstract?: string[];
	};
	inner_hits: {
		abstractDetails: InnerHits<"abstractDetails.content">;
		keywords: InnerHits<"keywords.value">;
		authors: InnerHits<"authors.name">;
	};
}

export function simpleSearch(
	{ language, page, term, quantityPerPage }: SimpleSearchParams,
) {
	const elasticIndex = match(language)
		.with("fr-FR", () => elastic.frFrDocument)
		.with("en-US", () => elastic.enUsDocument)
		.exhaustive();

	return elasticIndex.find<SimpleSearchResponse>({
		from: page * quantityPerPage,
		size: quantityPerPage,
		_source: ["abysBakedDocumentId", "title", "summary", "authors.name", "articleTypes", "webPublishDate", "journalPublishDate"],
		query: {
			bool: {
				should: [
					{
						multi_match: {
							query: term,
							fields: [
								"title^3",
								"abstract",
							],
						},
					},
					{
						nested: {
							path: "abstractDetails",
							query: {
								match: {
									"abstractDetails.content": term,
								},
							},
							inner_hits: {
								_source: false,
								highlight: {
									fields: {
										"abstractDetails.content": {
											fragment_size: 50,
										},
									},
								},
							},
						},
					},
					{
						nested: {
							path: "keywords",
							query: {
								match: {
									"keywords.value": {
										query: term,
										boost: 10,
									},
								},
							},
							inner_hits: {
								_source: false,
								highlight: {
									fields: {
										"keywords.value": {},
									},
								},
							},
						},
					},
					{
						nested: {
							path: "authors",
							query: {
								match: {
									"authors.name": {
										query: term,
										boost: 10,
									},
								},
							},
							inner_hits: {
								_source: false,
								highlight: {
									fields: {
										"authors.name": {},
									},
								},
							},
						},
					},
				],
			},
		},
		highlight: {
			fields: {
				title: {},
				abstract: {
					fragment_size: 50,
				},
			},
		},
		aggregations: facetsAggregations,
	});
}
