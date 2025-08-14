/* eslint-disable @typescript-eslint/no-use-before-define */
import { type Translate } from "@business/entites/translate";
import { envs } from "@interfaces/envs";
import { createExternalPromise } from "@vendors/clean";
import path from "path";
import { Worker } from "worker_threads";

export namespace GoogleScrape {
	export interface JobsParams {
		id: string;
		text: string;
		language: Translate.Language;
	}

	export interface JobsResult {
		id: string;
		text: string;
	}

	function workerEngine() {
		let inComingWorker: Promise<Worker> | undefined = undefined;

		const timeoutStratWorker = 10_000;

		return async() => {
			if (!inComingWorker) {
				const { promise, resolve, reject } = createExternalPromise<Worker>();
				inComingWorker = promise;

				try {
					const worker = await new Promise<Worker>(
						(promiseResolve, rejectResolve) => {
							const timeoutId = setTimeout(
								() => void rejectResolve(new Error("Worker timeout")),
								timeoutStratWorker,
							);

							const worker = new Worker(
								path.resolve(import.meta.dirname, "worker/main.js"),
							)
								.once("message", (message: string) => {
									if (message === "started") {
										clearTimeout(timeoutId);
										promiseResolve(worker);
									}
								})
								.once("error", rejectResolve)
								.once("exit", () => void rejectResolve(new Error("Worker exit Before start.")));
						},
					);

					worker.once("exit", () => {
						inComingWorker = undefined;
					});

					worker.setMaxListeners(Infinity);

					resolve(worker);
				} catch (error) {
					reject(error);
				}
			}

			return inComingWorker;
		};
	}

	function createCluster(replicas: number) {
		let currentWorker = 0;
		const cluster = Array
			.from({ length: replicas })
			.map(workerEngine);
		const next = 1;

		return () => {
			const woker = cluster[currentWorker];

			currentWorker = (currentWorker + next) % cluster.length;

			return woker();
		};
	}

	const getWorker = createCluster(envs.GOOGLE_SCRAPE_REPLICAS);

	export async function translate(
		text: string,
		language: Translate.Language,
	) {
		const worker = await getWorker();

		const result = await new Promise<JobsResult>((resolve, reject) => {
			const id = process.hrtime.bigint().toString();

			function onError(error?: Error) {
				worker
					.removeListener("message", onMessage)
					.removeListener("error", onError)
					.removeListener("exit", onError);

				reject(error ?? new Error("Worker exit whiout Error."));
			}

			function onMessage(data: JobsResult) {
				if (data.id !== id) {
					return;
				}

				worker
					.removeListener("message", onMessage)
					.removeListener("error", onError)
					.removeListener("exit", onError);

				resolve(data);
			}

			worker
				.on("message", onMessage)
				.on("error", onError)
				.on("exit", onError);

			worker.postMessage({
				id,
				text,
				language,
			} satisfies JobsParams);
		});

		return result.text;
	}
}

