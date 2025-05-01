import { Client } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { type ElasticDocument } from "./indexes";
import { enUsDocument, frFrDocument } from "./indexes/document";
import { sleep } from "@duplojs/utils";

export class Elastic {
	public static elasticClient: Client;

	public static elasticDocuments: ElasticDocument[] = [];

	public static async register(elasticDocument: ElasticDocument) {
		if (this.elasticDocuments.includes(elasticDocument)) {
			return;
		}

		this.elasticDocuments.push(elasticDocument);
		elasticDocument.elasticClient = this.elasticClient;

		const exists = await this.elasticClient.indices.exists({ index: elasticDocument.name });

		if (exists) {
			const { index: __, ...settings } = elasticDocument.settings;

			await this.elasticClient.indices.putMapping({
				index: elasticDocument.name,
				properties: elasticDocument.schema,
			});
			await this.elasticClient.indices.putSettings({
				index: elasticDocument.name,
				settings,
				reopen: true,
			});
		} else {
			await this.elasticClient.indices.create({
				index: elasticDocument.name,
				mappings: {
					properties: elasticDocument.schema,
				},
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
	const timeToWaitElasticUp = 5000;
	await sleep(timeToWaitElasticUp);

	await Promise.all([
		Elastic.register(enUsDocument),
		Elastic.register(frFrDocument),
	]);
}

export const elastic = {
	enUsDocument,
	frFrDocument,
};
