import { type Mission } from "@business/applications/repositories/mission";
import { parentPort } from "worker_threads";
import { type SearchResultWorkerResult } from "./missions/searchResult";

if (!parentPort) {
	throw new Error("This script is done to run with worker thread.");
}

export interface WorkerSuccessResult<
	GenericName extends unknown,
	GenericData extends unknown,
> {
	name: GenericName;
	data: GenericData;
}

export type WorkerResult =
	| SearchResultWorkerResult;

const missionFileWrapper = {
	searchResult: () => import(
		"./missions/searchResult",
	),
};

parentPort.on(
	"message",
	async(mission: ReturnType<Mission["toSimpleObject"]>) => {
		if (mission.name === "searchResult") {
			const { executeMission } = await missionFileWrapper.searchResult();

			const result = await executeMission(mission);

			if (result instanceof Error) {
				parentPort?.emit("messageerror", result);
			} else {
				parentPort?.emit("message", result);
			}
		}

		parentPort?.emit("messageerror", `Unsupported misson : ${JSON.stringify(mission)}`);
	},
);
