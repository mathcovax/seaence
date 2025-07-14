import { type Translate } from "@business/entites/translate";
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

		// 10 second
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
								.once("error", rejectResolve);
						},
					);

					worker.once("exit", () => {
						inComingWorker = undefined;
					});

					resolve(worker);
				} catch (error) {
					reject(error);
				}
			}

			return inComingWorker;
		};
	}

	const getWorker = workerEngine();

	export async function translate(
		text: string,
		language: Translate.Language,
	) {
		const worker = await getWorker();

		const result = await new Promise<JobsResult>((resolve, reject) => {
			const id = process.hrtime.bigint().toString();

			function onError(error: Error) {
				reject(error);
			}

			function onMessage(data: JobsResult) {
				if (data.id !== id) {
					return;
				}
				worker.removeListener("message", onMessage);
				worker.removeListener("error", onError);
				resolve(data);
			}

			worker
				.on("message", onMessage)
				.on("error", onError);

			worker.postMessage({
				id,
				text,
				language,
			} satisfies JobsParams);
		});

		return result.text;
	}
}

