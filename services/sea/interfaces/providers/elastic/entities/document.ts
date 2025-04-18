/* eslint-disable camelcase */
import { type estypes } from "@elastic/elasticsearch";

export const elasticDocumentMappingSchema: estypes.MappingTypeMapping = {
	properties: {
		id: {
			type: "keyword",
		},
		nodeSameRawDocumentId: {
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

export interface ElasticDocument {
	// TODO
}
