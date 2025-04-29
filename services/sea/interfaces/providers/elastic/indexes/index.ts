import { type Client, type estypes } from "@elastic/elasticsearch";

export class ElasticDocument<
	GenericeDocument extends object = object,
> {
	public elasticClient?: Client;

	public constructor(
		public name: string,
		public settings: estypes.IndicesIndexSettings,
		public schema: Record<string, estypes.MappingProperty>,
	) {}

	public upsertOne(document: GenericeDocument) {
		return this.elasticClient!.index({
			refresh: true,
			index: this.name,
			document,
		});
	}

	public find(query: estypes.QueryDslQueryContainer) {
		return this.elasticClient!.search<GenericeDocument>({
			index: this.name,
			query,
		});
	}
}
