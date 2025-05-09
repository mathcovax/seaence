
import { type estypes } from "@elastic/elasticsearch";
import { type ArticleType } from "../common/articleType";
import { type Provider } from "../common/provider";
import { type ExpectType } from "@duplojs/utils";
import { ElasticDocument } from ".";
import { languageEnum } from "../common/language";

export const elasticDocumentMappingSchema = {
	bakedDocumentId: {
		type: "keyword",
	},
	title: {
		type: "text",
		fields: {
			keyword: {
				type: "keyword",
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
		},
	},
	summary: {
		type: "text",
	},
	abstract: {
		type: "text",
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
			analyzer: {
				default: {
					type: "english",
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
			analyzer: {
				default: {
					type: "french",
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
