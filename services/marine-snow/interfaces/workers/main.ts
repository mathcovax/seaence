import { match } from "ts-pattern";
import { workerData } from "worker_threads";
import { type SupportedSearchResultMission } from "./missions/searchResult";

const currentData: SupportedSearchResultMission = workerData;

await match(currentData)
	.with(
		{ name: "searchResult" },
		(Data) => import("./missions/searchResult")
			.then(({ mission }) => void mission(Data)),
	)
	.exhaustive();
