
import { type estypes } from "@elastic/elasticsearch";
import { type ArticleType } from "../common/articleType";
import { type Provider } from "../common/provider";
import { type ExpectType } from "@duplojs/utils";
import { ElasticDocument } from ".";
import { languageEnum } from "../common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";

export const elasticDocumentMappingSchema = {
	bakedDocumentId: {
		type: "keyword",
	},
	title: {
		type: "text",
		fields: {
			stemmed: {
				type: "text",
				analyzer: "stemmer_analyzer",
			},
			strict: {
				type: "text",
				analyzer: "strict_analyzer",
			},
		},
	},
	articleTypes: {
		type: "keyword",
	},
	authors: {
		type: "text",
		fields: {
			keyword: {
				type: "keyword",
			},
			strict: {
				type: "text",
				analyzer: "strict_analyzer",
			},
		},
	},
	summary: {
		type: "text",
	},
	abstract: {
		type: "text",
		fields: {
			stemmed: {
				type: "text",
				analyzer: "stemmer_analyzer",
			},
			strict: {
				type: "text",
				analyzer: "strict_analyzer",
			},
		},
	},
	providers: {
		type: "keyword",
	},
	keywords: {
		type: "text",
		fields: {
			keyword: {
				type: "keyword",
			},
			strict: {
				type: "text",
				analyzer: "strict_analyzer",
			},
		},
	},
	webPublishDate: {
		type: "date",
	},
	webPublishSplitDate: {
		properties: {
			year: {
				type: "integer",
			},
			month: {
				type: "integer",
			},
			day: {
				type: "integer",
			},
		},
	},
	journalPublishDate: {
		type: "date",
	},
	journalPublishSplitDate: {
		properties: {
			year: {
				type: "integer",
			},
			month: {
				type: "integer",
			},
			day: {
				type: "integer",
			},
		},
	},
} satisfies Record<string, estypes.MappingProperty>;

export interface Document {
	bakedDocumentId: string;
	title: string;
	articleTypes: ArticleType[];
	authors: string[];
	summary: string | null;
	abstract: string | null;
	providers: Provider[];
	keywords: string[];
	webPublishDate: string | null;
	webPublishSplitDate: {
		year: number;
		month: number | null;
		day: number | null;
	} | null;
	journalPublishDate: string | null;
	journalPublishSplitDate: {
		year: number;
		month: number | null;
		day: number | null;
	} | null;
}

type _ExpectSameKeyof = ExpectType<
	keyof Document,
	keyof typeof elasticDocumentMappingSchema,
	"strict"
>;

export const enUsDocument = new ElasticDocument<Document>(
	`document_${languageEnum["en-US"]}`,
	"bakedDocumentId",
	{
		analysis: {
			filter: {
				stemmer_filter: {
					type: "stemmer",
					language: "english",
				},
				stop_filter: {
					type: "stop",
					stopwords: ["_english_"],
				},
			},
			normalizer: {
				flexible_normalizer: {
					type: "custom",
					filter: ["lowercase", "asciifolding"],
				},
			},
			analyzer: {
				default: {
					type: "english",
				},
				stemmer_analyzer: {
					type: "custom",
					tokenizer: "standard",
					filter: [
						"lowercase",
						"asciifolding",
						"stemmer_filter",
						"stop_filter",
					],
				},
				strict_analyzer: {
					type: "custom",
					tokenizer: "standard",
					filter: [
						"lowercase",
						"asciifolding",
					],
				},
			},
		},
		index: {
			number_of_shards: 3,
			number_of_replicas: 1,
		},
	},
	elasticDocumentMappingSchema,
);

export const frFrDocument = new ElasticDocument<Document>(
	`document_${languageEnum["fr-FR"]}`,
	"bakedDocumentId",
	{
		analysis: {
			filter: {
				stemmer_filter: {
					type: "stemmer",
					language: "french",
				},
				stop_filter: {
					type: "stop",
					stopwords: ["_french_"],
				},
				french_elision: {
					type: "elision",
					articles: ["l", "m", "t", "qu", "n", "s", "j", "d", "c", "jusqu", "quoiqu", "lorsqu", "puisqu"],
				},
			},
			normalizer: {
				flexible_normalizer: {
					type: "custom",
					filter: ["lowercase", "asciifolding"],
				},
			},
			analyzer: {
				default: {
					type: "french",
				},
				stemmer_analyzer: {
					type: "custom",
					tokenizer: "standard",
					filter: [
						"lowercase",
						"asciifolding",
						"french_elision",
						"stemmer_filter",
						"stop_filter",
					],
				},
				strict_analyzer: {
					type: "custom",
					tokenizer: "standard",
					filter: [
						"lowercase",
						"asciifolding",
					],
				},
			},
		},
		index: {
			number_of_shards: 3,
			number_of_replicas: 1,
		},
	},
	elasticDocumentMappingSchema,
);

export type AvailableField =
	| keyof Document
	| "journalPublishSplitDate.year"
	| "webPublishSplitDate.year"
	| "title.stemmed"
	| "abstract.stemmed"
	| "authors.strict"
	| "keywords.keyword"
	| "keywords.strict"
	| "abstract.strict"
	| "title.strict";

export const availableFieldEnum = createEnum([
	"bakedDocumentId",
	"title",
	"articleTypes",
	"authors",
	"summary",
	"abstract",
	"providers",
	"keywords",
	"webPublishDate",
	"webPublishSplitDate",
	"journalPublishDate",
	"journalPublishSplitDate",
	"journalPublishSplitDate.year",
	"webPublishSplitDate.year",
	"title.stemmed",
	"abstract.stemmed",
	"authors.strict",
	"keywords.keyword",
	"abstract.strict",
	"title.strict",
	"keywords.strict",
] as const satisfies AvailableField[]);

type _ExpectAvailableFieldEnumHasAllKey = ExpectType<
	GetEnumValue<typeof availableFieldEnum>,
	AvailableField,
	"strict"
>;
