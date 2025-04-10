import { type SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { WorkerMissionError } from "@interfaces/workers/WorkerMissionError";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { postMessage } from "../postMessage";

export type SupportedSearchResultMission = SimplifyObjectTopLevel<
	(
		| (EntityToSimpleObject<typeof SearchResultPubMedMissionEntity> & { provider: "pubmed" })
	) & {
		missionName: "searchResult";
	}
>;

interface OutputSearchResultPudMedMission {
	type: "pubmed";
	step: EntityToSimpleObject<typeof SearchResultPubMedMissionStepEntity>;
	searchResults: EntityToSimpleObject<typeof SearchResultEntity>[];
}

export type SearchResultMissionOutput = SimplifyObjectTopLevel<
	(
		| OutputSearchResultPudMedMission
	) & {
		missionName: "searchResult";
	}
>;

function output(data: SearchResultMissionOutput) {
	return postMessage(data);
}

const dateAdvancement = 1;
const maxPageIteration = 1000;
const expectHttpCode = 200;

export async function mission(mission: SupportedSearchResultMission) {
	await match(mission)
		.with(
			{ provider: "pubmed" },
			async({ interval, articleType }) => {
				for (
					let currentDate = new Date(interval.from);
					currentDate.getTime() <= interval.to.getTime();
					currentDate.setDate(currentDate.getDate() + dateAdvancement)
				) {
					for (let page = 0; page <= maxPageIteration; page++) {
						if (page === maxPageIteration) {
							throw new WorkerMissionError("Misson exceed page limit", mission);
						}

						const response = await PubMedAPI.getSearchResult(
							page,
							currentDate,
							articleType,
						);

						if (response.code !== expectHttpCode) {
							throw new WorkerMissionError("Unexpected response", mission, { response });
						}

						if (!response.body.esearchresult.idlist.length) {
							break;
						}

						await output({
							missionName: "searchResult",
							type: "pubmed",
							step: {
								missionId: mission.id,
								date: new Date(currentDate),
								page,
							},
							searchResults: response.body.esearchresult.idlist.map(
								(id) => ({
									provider: "pubmed",
									reference: id,
									failedToSend: false,
								}),
							),
						});
					}
				}
			},
		)
		.exhaustive();
}
