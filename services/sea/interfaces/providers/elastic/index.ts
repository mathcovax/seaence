import { Client, type estypes } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { type ElasticDocument, elasticDocumentMappingSchema, elasticDocumentSettingsSchema } from "./entities/document";
import { match } from "ts-pattern";

type Language = "fr-Fr" | "en-US";

const db = new Client({
	node: envs.ES_BASE_URL,
});

const IndexNames = ["document_fr-Fr", "document_en-US"] as const;

async function configureIndex(IndexName: string) {
	const exists = await db.indices.exists({ index: IndexName });

	return match({ exists })
		.with({ exists: false }, async() => {
			await db.indices.create({
				index: IndexName,
				mappings: elasticDocumentMappingSchema,
				settings: elasticDocumentSettingsSchema,
			});
			console.log(`L'index ${IndexName} a été créée.`);
		})
		.with({ exists: true }, async() => {
			await db.indices.close({ index: IndexName });
			await db.indices.putMapping({
				index: IndexName,
				properties: elasticDocumentMappingSchema.properties,
			});
			await db.indices.putSettings({
				index: IndexName,
				settings: {
					analysis: elasticDocumentSettingsSchema.analysis,
				},
			});
			await db.indices.open({ index: IndexName });
			console.log(`L'index ${IndexName} a été mise à jour.`);
		})
		.exhaustive();
}

if (envs.DB_CONNECTION) {
	await Promise.all(IndexNames.map(configureIndex));
}

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
