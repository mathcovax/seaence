/* eslint-disable no-console */
import { Client, type estypes } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { type ElasticDocument, elasticDocumentMappingSchema, elasticDocumentSettingsSchema } from "./entities/document";
import { match } from "ts-pattern";

type Language = "fr-Fr" | "en-US";

const db = new Client({
	node: envs.ES_BASE_URL,
});

const collectionNames = ["document_fr-Fr", "document_en-US"] as const;

async function configureCollection(collectionName: string) {
	const exists = await db.indices.exists({ index: collectionName });

	return match({ exists })
		.with({ exists: false }, async() => {
			await db.indices.create({
				index: collectionName,
				mappings: elasticDocumentMappingSchema,
				settings: elasticDocumentSettingsSchema,
			});
			console.log(`La collection ${collectionName} a été créée.`);
		})
		.with({ exists: true }, async() => {
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
			console.log(`La collection ${collectionName} a été mise à jour.`);
		})
		.exhaustive();
}

await Promise.all(collectionNames.map(configureCollection));

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
