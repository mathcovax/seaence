/* eslint-disable camelcase */
import { type estypes } from "@elastic/elasticsearch";
import { type ArticleType } from "../common/articleType";
import { type Provider } from "../common/provider";
import { type ExpectType } from "@duplojs/utils";
import { ElasticDocument } from ".";
import { languageEnum } from "../common/language";

export const elasticDocumentMappingSchema = {

	abysBakedDocumentId: {
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
		type: "nested",
		properties: {
			name: {
				type: "text",
				fields: {
					keyword: {
						type: "keyword",
					},
				},
			},
			affiliations: {
				type: "keyword",
			},
		},
	},
	abstract: {
		type: "text",
	},
	abstractDetails: {
		type: "nested",
		properties: {
			name: {
				type: "keyword",
			},
			content: {
				type: "text",
			},
		},
	},
	providers: {
		type: "nested",
		properties: {
			value: {
				type: "keyword",
			},
		},
	},
	keywords: {
		type: "nested",
		properties: {
			value: {
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

export const elasticDocumentSettingsSchema = {
	analysis: {
		analyzer: {
			default: {
				type: "standard",
			},
		},
	},
	index: {
		number_of_shards: 3,
		number_of_replicas: 1,
	},
} satisfies estypes.IndicesIndexSettings;

export interface Document {
	abysBakedDocumentId: string;
	title: string;
	articleTypes: ArticleType[];
	authors: {
		name: string;
		affiliations: string[] | null;
	}[];
	abstract: string | null;
	abstractDetails: {
		name: string;
		content: string;
	}[] | null;
	providers: {
		value: Provider;
	}[];
	keywords: { value: string }[];
	webPublishDate: Date | null;
	webPublishSplitDate: {
		year: number;
		month: number | null;
		day: number | null;
	} | null;
	journalPublishDate: Date | null;
	journalPublishSplitDate: {
		year: number;
		month: number | null;
		day: number | null;
	} | null;
}

type _Check1 = ExpectType<
	keyof Document,
	keyof typeof elasticDocumentMappingSchema,
	"strict"
>;

export const enUsDocument = new ElasticDocument<Document>(
	`document_${languageEnum["en-US"]}`,
	"abysBakedDocumentId",
	elasticDocumentSettingsSchema,
	elasticDocumentMappingSchema,
);

export const frFrDocument = new ElasticDocument<Document>(
	`document_${languageEnum["fr-FR"]}`,
	"abysBakedDocumentId",
	elasticDocumentSettingsSchema,
	elasticDocumentMappingSchema,
);
