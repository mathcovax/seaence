import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SupportedSearchResultMission } from "./missions/searchResult";

export type SupportedWorkerMission =
	| SupportedSearchResultMission;

const currentData: SupportedWorkerMission = workerData;

await match(currentData)
	.with(
		{ name: "searchResult" },
		(Data) => import("./missions/searchResult")
			.then(({ mission }) => void mission(Data)),
	)
	.exhaustive();
