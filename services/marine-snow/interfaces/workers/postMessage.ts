import { parentPort } from "worker_threads";
import { type OutputWorkerMission } from "./main";

export function postMessage(output: OutputWorkerMission) {
	const waitNext = new Promise<void>((resolve) => {
		parentPort!.once(
			"message",
			(message) => {
				if (message === "next") {
					resolve();
				}
			},
		);
	});

	parentPort!.postMessage(output);

	return waitNext;
}
