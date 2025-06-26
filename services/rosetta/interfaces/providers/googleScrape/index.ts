import { type Translate } from "@business/entites/translate";
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
	private static worker = new Worker(
		resolve(import.meta.dirname, "worker/main.js"),
	);

	public static async translate(
		text: string,
		language: Translate.Language,
	) {
		const result = await new Promise<JobsResult>((resolve, reject) => {
			const id = process.hrtime.bigint().toString();

			this.worker
				.on("message", (data: JobsResult) => {
					if (data.id !== id) {
						return;
					}

					resolve(data);
				})
				.on("error", reject);

			this.worker.postMessage({
				id,
				text,
				language,
			} satisfies JobsParams);
		});

		return result.text;
	}
}
