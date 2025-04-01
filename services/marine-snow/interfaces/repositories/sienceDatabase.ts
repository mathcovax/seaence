import { sienceDatabaseRepository } from "@business/applications/repositories/sienceDatabase";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { reactive, watch } from "@vue/reactivity";
import { type SearchResultMissionOutput } from "@interfaces/workers/missions/searchResult";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { resolve } from "path";
import { match } from "ts-pattern";
import { Worker } from "worker_threads";

sienceDatabaseRepository.default = {
	save() {
		throw new Error("Unsupport save method");
	},

	async *startSearchResultMission(mission) {
		const worker = new Worker(
			resolve(import.meta.dirname, "../workers/main.js"),
			{
				workerData: mission.toSimpleObject(),
			},
		);

		const messageQueue = reactive<(SearchResultMissionOutput | Error)[]>([]);

		worker
			.on(
				"message",
				(data) => messageQueue.push(data as never),
			)
			.on(
				"error",
				(data) => messageQueue.push(data),
			);

		while (true) {
			if (!messageQueue.length) {
				await new Promise<void>(
					(resolve) => {
						const watchHandle = watch(
							messageQueue,
							() => {
								watchHandle.stop();
								resolve();
							},
						);
					},
				);
			}

			const result = messageQueue.shift()!;

			if (!result) {
				continue;
			}

			if (result === "finish") {
				break;
			}

			if (result instanceof Error) {
				yield new RepositoryError("worker-reject-error", { error: result });
				break;
			}

			yield match(result)
				.with(
					{ type: "pubmed" },
					({ step, searchResults }) => ({
						currentStep: EntityHandler.unsafeMapper(
							SearchResultPubMedMissionStepEntity,
							step,
						),
						searchResults: searchResults.map(
							(searchResult) => EntityHandler.unsafeMapper(
								SearchResultEntity,
								searchResult,
							),
						),
					}),
				)
				.exhaustive();
		}
	},
};
