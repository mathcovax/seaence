import { type Translate } from "@business/entites/translate";
import { envs } from "@interfaces/envs";
import { createExternalPromise } from "@vendors/clean";
import { resolve } from "path";
import { Worker } from "worker_threads";

export interface JobsParams {
	id: string;
	text: string;
	language: Translate.Language;
}

export interface JobsResult {
	id: string;
	text: string;
}

export class GoogleScrape {
	public static worker = createExternalPromise<Worker>();

	public static async translate(
		text: string,
		language: Translate.Language,
	) {
		const worker = await this.worker.promise;

		const result = await new Promise<JobsResult>((resolve, reject) => {
			const id = process.hrtime.bigint().toString();

			async function onError(error: Error) {
				await GoogleScrape.initWorker();
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

	public static async initWorker() {
		this.worker = createExternalPromise();

		const timeoutStratWorker = 10000;

		const worker = await new Promise<Worker>(
			(promiseResolve, rejectResolve) => {
				const timeoutId = setTimeout(
					() => void rejectResolve(new Error("Worker timeout")),
					timeoutStratWorker,
				);

				const worker = new Worker(
					resolve(import.meta.dirname, "worker/main.js"),
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

		this.worker.resolve(worker);
	}
}

if (envs.DB_CONNECTION) {
	await GoogleScrape.initWorker();
}

