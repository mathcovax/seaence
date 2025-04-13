/* eslint-disable no-console */
import { Client, type estypes } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { type ElasticDocument, elasticDocumentMappingSchema, elasticDocumentSettingsSchema } from "./entities/document";

type Language = "fr-Fr" | "en-US";

const db = new Client({
	node: envs.ES_BASE_URL,
});

const collectionNames = ["document_fr-Fr", "document_en-US"];

await Promise.all(
	collectionNames.map(async(collectionName) => {
		const exist = await db.indices.exists({ index: collectionName });
		if (!exist) {
			await db.indices.create({
				index: collectionName,
				mappings: elasticDocumentMappingSchema,
				settings: elasticDocumentSettingsSchema,
			});
			console.log(`La collection ${collectionName} a été créé.`);
		} else {
			await db.indices.close({ index: collectionName });
			await db.indices.putMapping({
				index: collectionName,
				properties: elasticDocumentMappingSchema.properties,
			});
			await db.indices.putSettings({
				index: collectionName,
				settings: {
					analysis: elasticDocumentSettingsSchema.analysis,
				},
			});
			await db.indices.open({ index: collectionName });
		}
	}),
);

export const elastic = {
	db,
	async upsertOne(document: ElasticDocument, language: Language) {
		return db.index({
			refresh: true,
			index: `document_${language}`,
			document,
		});
	},
	async findOne(query: estypes.QueryDslQueryContainer, language: Language) {
		return db.search<ElasticDocument>({
			index: `document_${language}`,
			query,
		});
	},
	async findByInterval(query: estypes.QueryDslQueryContainer, language: Language, from: number, size: number) {
		return db.search<ElasticDocument>({
			index: `document_${language}`,
			query,
			size,
			from,
		});
	},
};
