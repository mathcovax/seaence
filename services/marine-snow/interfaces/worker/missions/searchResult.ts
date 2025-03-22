import { type SearchResultMissionEntity } from "@business/domains/entities/mission/searchResultMission";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type WorkerSuccessResult } from "../main";

const scienceDatabaseWrapper = {

};

export type SearchResultWorkerResult = WorkerSuccessResult<
	"searchResult",
	ReturnType<SearchResultEntity["toSimpleObject"]>[]
>;

export async function executeMission(
	mission: ReturnType<SearchResultMissionEntity["toSimpleObject"]>,
): Promise<SearchResultWorkerResult | Error> {
	await Promise.resolve();

	return {
		name: "searchResult",
		data: [],
	};
}
