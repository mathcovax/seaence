/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { type Client, type estypes } from "@elastic/elasticsearch";
import { TechnicalError } from "@vendors/clean/error";

export class ElasticDocument<
	GenericeDocument extends object = any,
> {
	public name: string;

	public elasticClient?: Client;

	public constructor(
		name: string,
		public keyId: keyof GenericeDocument,
		public settings: estypes.IndicesIndexSettings,
		public schema: Record<string, estypes.MappingProperty>,
	) {
		this.name = name.toLowerCase();
	}

	public upsertOne(document: GenericeDocument) {
		const id = document[this.keyId]?.toString?.();

		if (!id) {
			throw new TechnicalError("mission Id", {
				keyId: this.keyId,
				document,
			});
		}

		return this.elasticClient!.update({
			refresh: true,
			index: this.name,
			id,
			doc: document,
			doc_as_upsert: true,
		});
	}

	public find(query: estypes.QueryDslQueryContainer) {
		return this.elasticClient!.search<GenericeDocument>({
			index: this.name,
			query,
		});
	}
}
