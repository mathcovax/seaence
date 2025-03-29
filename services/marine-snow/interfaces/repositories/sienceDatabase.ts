import { sienceDatabaseRepository } from "@business/applications/repositories/sienceDatabase";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { type Change, Observable } from "@gullerya/object-observer";
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
			{ workerData: mission },
		);

		const messageQueue = Observable.from<(SearchResultMissionOutput | Error)[]>([]);

		worker.on(
			"message",
			(data) => messageQueue.push(data as never),
		);

		worker.on(
			"error",
			(data) => messageQueue.push(data),
		);

		while (true) {
			if (!messageQueue.length) {
				await new Promise<void>(
					(resolve) => {
						function observeChange(changes: Change[]) {
							if (!changes.find((change) => change.type === "insert")) {
								return;
							}

							Observable.unobserve(
								messageQueue,
								observeChange,
							);
							resolve();
						}

						Observable.observe(
							messageQueue,
							observeChange,
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
				yield new RepositoryError("worker-reject-error", result.toString());
				break;
			}

			yield match(result)
				.with(
					{ type: "PubMed" },
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
