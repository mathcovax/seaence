import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SearchResultMissionOutput, type SupportedSearchResultMission } from "./missions/searchResult";
import { type SendSearchResultMissionOutput, type SupportedSendSearchResultMission } from "./missions/sendSearchResult";
import { postMessage } from "./postMessage";
import { deepLog } from "@interfaces/utils/deepLog";
import { type SupportedSingleSendSearchResultMission, type SingleSendSearchResultMissionOutput } from "./missions/sendSearchResult/single";

process.on("uncaughtException", deepLog);

export type SupportedWorkerMission =
	| SupportedSearchResultMission
	| SupportedSendSearchResultMission
	| SupportedSingleSendSearchResultMission;

export type OutputWorkerMission =
	| SearchResultMissionOutput
	| SendSearchResultMissionOutput
	| SingleSendSearchResultMissionOutput
	| "finish";

const currentData: SupportedWorkerMission = workerData;

await match(currentData)
	.with(
		{ missionName: "searchResult" },
		(data) => import("./missions/searchResult")
			.then(({ mission }) => mission(data)),
	)
	.with(
		{ missionName: "sendSearchResult" },
		(data) => import("./missions/sendSearchResult")
			.then(({ mission }) => mission(data)),
	)
	.with(
		{ missionName: "singleSendSearchResult" },
		(data) => import("./missions/sendSearchResult/single")
			.then(({ mission }) => mission(data)),
	)
	.exhaustive();

await postMessage("finish");

