import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SearchResultMissionOutput, type SupportedSearchResultMission } from "./missions/searchResult";
import { type SendSearchResultMissionOutput, type SupportedSendSearchResultMission } from "./missions/sendSearchResult";
import { postMessage } from "./postMessage";
import { deepLog } from "@interfaces/utils/deepLog";
import { type SupportedSendOneSearchResultMission, type SendOneSearchResultMissionOutput } from "./missions/sendSearchResult/one";

process.on("uncaughtException", async(error) => {
	deepLog(error);

	await postMessage("finish");
});

export type SupportedWorkerMission =
	| SupportedSearchResultMission
	| SupportedSendSearchResultMission
	| SupportedSendOneSearchResultMission;

export type OutputWorkerMission =
	| SearchResultMissionOutput
	| SendSearchResultMissionOutput
	| SendOneSearchResultMissionOutput
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
		{ missionName: "SendOneSearchResult" },
		(data) => import("./missions/sendSearchResult/one")
			.then(({ mission }) => mission(data)),
	)
	.exhaustive();

await postMessage("finish");

