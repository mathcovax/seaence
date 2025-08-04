/* eslint-disable @typescript-eslint/no-explicit-any */
import { type estypes, type Client } from "@elastic/elasticsearch";

export namespace Elastic {
	export interface ElasticIndex<
		GenericeName extends string = string,
		GenericeSchema extends Record<string, estypes.MappingProperty> = any,
		GenericeDocument extends Record<keyof GenericeSchema, any> = any,
	> {
		name: GenericeName;
		schema: GenericeSchema;
		keyId: keyof GenericeSchema;
		settings: estypes.IndicesIndexSettings;
		"z-document": GenericeDocument;
	}

	export function createIndex<
		GenericeName extends string,
		GenericeSchema extends Record<string, estypes.MappingProperty>,
	>({ name, schema, keyId, settings }: {
		name: GenericeName;
		schema: GenericeSchema;
		keyId: keyof GenericeSchema;
		settings: estypes.IndicesIndexSettings;
	}) {
		return <
			GenericeDocument extends Record<keyof GenericeSchema, any>,
		>(): ElasticIndex<
			Lowercase<GenericeName>,
			GenericeSchema,
			GenericeDocument
		> => ({
			name: name.toLowerCase() as Lowercase<GenericeName>,
			schema,
			keyId,
			settings,
			"z-document": {} as never,
		});
	}

	export async function register(elasticClient: Client, elasticIndex: ElasticIndex) {
		const exists = await elasticClient.indices.exists({ index: elasticIndex.name });

		if (exists) {
			const { index: __, ...settings } = elasticIndex.settings;

			await elasticClient.indices.putMapping({
				index: elasticIndex.name,
				properties: elasticIndex.schema,
			});
			await elasticClient.indices.putSettings({
				index: elasticIndex.name,
				settings,
				reopen: true,
			});
		} else {
			await elasticClient.indices.create({
				index: elasticIndex.name,
				mappings: {
					properties: elasticIndex.schema,
				},
				settings: elasticIndex.settings,
			});
		}

		await elasticClient.indices.open({ index: elasticIndex.name });
	}

	export function find<
		GenericResult extends unknown,
	>(
		elasticClient: Client,
		elasticIndex: ElasticIndex,
		query: Omit<estypes.SearchRequest, "index">,
	) {
		return elasticClient.search({
			...query,
			index: elasticIndex.name,
		}) as Promise<GenericResult>;
	}

	export function upsertOne<
		GenericIndex extends ElasticIndex,
	>(
		elasticClient: Client,
		elasticIndex: GenericIndex,
		document: GenericIndex["z-document"],
	) {
		return elasticClient.update({
			refresh: true,
			index: elasticIndex.name,
			id: document[elasticIndex.keyId],
			doc: document,
			doc_as_upsert: true,
		});
	}

	export function createIndexInterface<
		GenericIndex extends ElasticIndex,
	>(
		elasticClient: Client,
		elasticIndex: GenericIndex,
	) {
		return {
			find: <
				GenericResult extends unknown,
			>(
				query: Parameters<typeof find>["2"],
			) => find<GenericResult>(elasticClient, elasticIndex, query),
			upsertOne: (
				document: GenericIndex["z-document"],
			) => upsertOne(elasticClient, elasticIndex, document),
		};
	}
}
