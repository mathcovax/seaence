import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SearchResultMissionOutput, type SupportedSearchResultMission } from "./missions/searchResult";

export type SupportedWorkerMission =
	| SupportedSearchResultMission;

export type OutputWorkerMission =
	| SearchResultMissionOutput;

const currentData: SupportedWorkerMission = workerData;

await match(currentData)
	.with(
		{ missionName: "searchResult" },
		(Data) => import("./missions/searchResult")
			.then(({ mission }) => void mission(Data)),
	)
	.exhaustive();
