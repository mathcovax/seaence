/* eslint-disable camelcase */
import { type estypes } from "@elastic/elasticsearch";
import { type AbstractSectionName, abstractSectionNameEnum } from "../common/abstractSection";
import { type Provider, providerEnum } from "../common/provider";
import { type ExpectType } from "@duplojs/utils";
import { ElasticDocument } from ".";
import { languageEnum } from "../common/language";

export const elasticDocumentMappingSchema = {
	abysBakedDocumentId: {
		type: "keyword",
	},
	title: {
		type: "text",
		analyzer: "standard",
	},
	abstract: {
		type: "text",
		analyzer: "standard",
	},
	abstractDetails: {
		properties: abstractSectionNameEnum
			.toTuple()
			.reduce(
				(pv, cv) => ({
					...pv,
					[cv]: {
						properties: {
							value: {
								type: "text",
								analyzer: "standard",
							},
						},
					} satisfies estypes.MappingProperty,
				}),
				{} as Record<AbstractSectionName, estypes.MappingProperty>,
			),
	},
	ressources: {
		properties: providerEnum
			.toTuple()
			.reduce(
				(pv, cv) => ({
					...pv,
					[cv]: {
						properties: {
							name: {
								type: "keyword",
							},
							url: {
								type: "keyword",
							},
						},
					} satisfies estypes.MappingProperty,
				}),
				{} as Record<Provider, estypes.MappingProperty>,
			),
	},
	keywords: {
		properties: {
			keywords: {
				type: "text",
				analyzer: "standard",
				fields: {
					raw: {
						type: "keyword",
					},
				},
			},
		},
	},
	webPublishDate: {
		type: "date",
	},
	webPublishSplitDate: {
		properties: {
			day: {
				type: "integer",
			},
			month: {
				type: "integer",
			},
			year: {
				type: "integer",
			},
		},
	},
	journalPublishDate: {
		type: "date",
	},
	journalPublishSplitDate: {
		properties: {
			day: {
				type: "integer",
			},
			month: {
				type: "integer",
			},
			year: {
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
	abstract: string | null;
	abstractDetails: Partial<
		Record<
			AbstractSectionName,
			{ value: string } | undefined
		>
	> | null;
	ressources: Partial<
		Record<
			Provider, {
				name: string;
				url: string;
			}
		>
	>;
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

type _Check2 = ExpectType<
	keyof Exclude<Document["abstractDetails"], null>,
	keyof typeof elasticDocumentMappingSchema["abstractDetails"]["properties"],
	"strict"
>;

type _Check3 = ExpectType<
	keyof Document["ressources"],
	keyof typeof elasticDocumentMappingSchema["ressources"]["properties"],
	"strict"
>;

export const enUsBackedDocument = new ElasticDocument<Document>(
	`document_${languageEnum["en-US"]}`,
	elasticDocumentSettingsSchema,
	elasticDocumentMappingSchema,
);

export const frFrBackedDocument = new ElasticDocument<Document>(
	`document_${languageEnum["fr-Fr"]}`,
	elasticDocumentSettingsSchema,
	elasticDocumentMappingSchema,
);
