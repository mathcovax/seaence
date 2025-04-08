import { reactive, watch } from "@vue/reactivity";
import { resolve } from "path";
import { Worker } from "worker_threads";
import { type SupportedWorkerMission, type OutputWorkerMission } from "./main";

export async function *startWorkerMission(missionData: SupportedWorkerMission) {
	const worker = new Worker(
		resolve(import.meta.dirname, "./main.js"),
		{ workerData: missionData },
	);

	const messageQueue = reactive<(OutputWorkerMission | Error)[]>([]);

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

		const result = messageQueue.shift();

		if (!result) {
			continue;
		}

		if (result === "finish") {
			return;
		}

		if (result instanceof Error) {
			yield result;
			return;
		}

		yield result;
	}
}
