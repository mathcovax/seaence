
import { Client } from "@elastic/elasticsearch";
import { envs } from "@interfaces/envs";
import { enUsElasticIndex, frFrElasticIndex } from "./indexes/document";
import { sleep } from "@duplojs/utils";
import { Elastic } from "./elastic";

const elasticClient = new Client({
	node: envs.ES_BASE_URL,
});

if (envs.DB_CONNECTION) {
	if (envs.ENVIROMENT === "DEV") {
		const timeToWaitElasticUp = 5000;
		await sleep(timeToWaitElasticUp);
	}

	await Promise.all([
		Elastic.register(elasticClient, enUsElasticIndex),
		Elastic.register(elasticClient, frFrElasticIndex),
	]);
}

export const elastic = {
	enUsDocument: Elastic.createIndexInterface(elasticClient, enUsElasticIndex),
	frFrDocument: Elastic.createIndexInterface(elasticClient, frFrElasticIndex),
};
