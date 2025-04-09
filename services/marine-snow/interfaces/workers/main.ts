import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SearchResultMissionOutput, type SupportedSearchResultMission } from "./missions/searchResult";
import { type SendSearchResultMissionOutput, type SupportedSendSearchResultMission } from "./missions/sendSearchResult";

export type SupportedWorkerMission =
	| SupportedSearchResultMission
	| SupportedSendSearchResultMission;

export type OutputWorkerMission =
	| SearchResultMissionOutput
	| SendSearchResultMissionOutput;

const currentData: SupportedWorkerMission = workerData;

await match(currentData)
	.with(
		{ missionName: "searchResult" },
		(data) => import("./missions/searchResult")
			.then(({ mission }) => void mission(data)),
	)
	.with(
		{ missionName: "sendSearchResult" },
		(data) => import("./missions/sendSearchResult")
			.then(({ mission }) => void mission(data)),
	)
	.exhaustive();
