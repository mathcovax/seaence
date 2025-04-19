/* eslint-disable camelcase */
import { type estypes } from "@elastic/elasticsearch";
import { createEnum } from "@vendors/clean";

export const elasticDocumentMappingSchema: estypes.MappingTypeMapping = {
	properties: {
		AbysBakedDocumentId: {
			type: "keyword",
		},
		title: {
			type: "text",
			analyzer: "standard",
			fields: {
				keyword: {
					type: "keyword",
				},
			},
		},
		abstract: {
			type: "text",
			analyzer: "standard",
		},
		abstractDetails: {
			dynamic: true,
			// @ts-expect-error Elasticsearch dynamic_templates n'est pas correctement typé
			dynamic_templates: [
				{
					section_objects: {
						match_mapping_type: "object",
						mapping: {
							properties: {
								value: {
									type: "text",
									analyzer: "standard",
								},
							},
						},
					},
				},
			],
		},
		ressources: {
			properties: {
				pubmed: {
					properties: {
						name: {
							type: "text",
							fields: {
								keyword: {
									type: "keyword",
								},
							},
						},
						url: {
							type: "keyword",
						},
					},
				},
			},
		},
		keywords: {
			type: "nested",
			properties: {
				pound: {
					type: "float",
				},
				value: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
			},
		},
		webPublishDate: {
			properties: {
				day: {
					type: "integer",
					null_value: undefined,
				},
				month: {
					type: "integer",
					null_value: undefined,
				},
				year: {
					type: "integer",
				},
			},
		},
		journalPublishDate: {
			properties: {
				day: {
					type: "integer",
					null_value: undefined,
				},
				month: {
					type: "integer",
					null_value: undefined,
				},
				year: {
					type: "integer",
				},
			},
		},
	},
};

export const elasticDocumentSettingsSchema: estypes.IndicesIndexSettings = {
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
};

const dateSchema = zod
	.object({
		day: zod.number().nullable(),
		month: zod.number().nullable(),
		year: zod.number(),
	});

export const abstractSectionNameEnum = createEnum([
	"introduction",
	"background",
	"objective",
	"method",
	"result",
	"conclusion",
	"reference",
	"acknowledgment",
	"objective",
	"option",
	"outcome",
	"evidence",
	"value",
	"benefit",
	"recommendation",
	"validation",
	"sponsor",
	"purpose",
	"patient",
	"setting",
	"studyObjective",
	"measurementAndMainResult",

	"introductions",
	"backgrounds",
	"objectives",
	"methods",
	"results",
	"conclusions",
	"references",
	"acknowledgments",
	"objectives",
	"options",
	"outcomes",
	"evidences",
	"values",
	"benefits",
	"recommendations",
	"validations",
	"sponsors",
	"purposes",
	"patients",
	"settings",
	"studyObjectives",
	"measurementsAndMainResults",
]);

export const elasticDocumentSchema = zod
	.object({
		AbysBakedDocumentId: zod.string(),
		title: zod.string(),
		abstract: zod.string().optional(),
		abstractDetails: zod.record(
			zod.enum(abstractSectionNameEnum.toTuple()),
			zod.object({
				value: zod.string(),
			}).passthrough().optional(),
		),
		ressources: zod.object({
			pubmed: zod.object({
				name: zod.string().optional(),
				url: zod.string().optional(),
			}).optional(),
		}),
		keywords: zod.object({
			pound: zod.number(),
			value: zod.string(),
		}).array().optional(),
		webPublishDate: dateSchema,
		journalPublishDate: dateSchema,
	});

export type ElasticDocument = Zod.infer<typeof elasticDocumentSchema>;
