import { Client } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { type ElasticDocument } from "./indexes";
import { enUsBackedDocument, frFrBackedDocument } from "./indexes/document";

export class Elastic {
	public static elasticClient: Client;

	public static elasticDocuments: ElasticDocument[];

	public static async register(elasticDocument: ElasticDocument) {
		if (this.elasticDocuments.includes(elasticDocument)) {
			return;
		}

		this.elasticDocuments.push(elasticDocument);
		elasticDocument.elasticClient = this.elasticClient;

		const exists = await this.elasticClient.indices.exists({ index: elasticDocument.name });

		if (exists) {
			await this.elasticClient.indices.putMapping({
				index: elasticDocument.name,
				properties: elasticDocument.schema,
			});
			await this.elasticClient.indices.putSettings({
				index: elasticDocument.name,
				settings: elasticDocument.settings,
			});
		} else {
			await this.elasticClient.indices.create({
				index: elasticDocument.name,
				mappings: elasticDocument.schema,
				settings: elasticDocument.settings,
			});
		}

		await this.elasticClient.indices.open({ index: elasticDocument.name });
	}

	static {
		this.elasticClient = new Client({
			node: envs.ES_BASE_URL,
		});
	}
}

if (envs.DB_CONNECTION) {
	await Promise.all([
		Elastic.register(enUsBackedDocument),
		Elastic.register(frFrBackedDocument),
	]);
}
