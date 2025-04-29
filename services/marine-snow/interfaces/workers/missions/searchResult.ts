import { type PubMedSearchResultMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { type SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { postMessage } from "../postMessage";
import { articleTypeToFilterArticleType } from "@interfaces/providers/scienceDatabase/pubmed/types/utils";
import { TechnicalError } from "@vendors/clean/error";

export type SupportedSearchResultMission = SimplifyObjectTopLevel<
	(
		| (EntityToSimpleObject<typeof PubMedSearchResultMissionEntity> & { provider: "pubmed" })
	) & {
		missionName: "searchResult";
	}
>;

type OutputSearchResultPudMedMission = {
	type: "pubmed";
	step: EntityToSimpleObject<typeof SearchResultPubMedMissionStepEntity>;
} & (
	{
		searchResults: EntityToSimpleObject<typeof SearchResultEntity>[];
		error: undefined;
	} | {
		searchResults: undefined;
		error: Error;
	}
);

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
						const step: OutputSearchResultPudMedMission["step"] = {
							missionId: mission.id,
							date: new Date(currentDate),
							page,
						};

						if (page === maxPageIteration) {
							await output({
								type: "pubmed",
								missionName: "searchResult",
								step,
								error: new TechnicalError("Misson exceed page limit", { mission }),
								searchResults: undefined,
							});
							return;
						}

						const response = await PubMedAPI.getSearchResult(
							page,
							currentDate,
							articleTypeToFilterArticleType[articleType],
						);

						if (response instanceof Error || response.code !== expectHttpCode) {
							await output({
								type: "pubmed",
								missionName: "searchResult",
								step,
								error: new TechnicalError(
									"unexpected-response",
									{
										mission,
										page,
										currentDate,
										articleType,
										response,
									},
								),
								searchResults: undefined,
							});
							return;
						}

						if (!response.body.esearchresult.idlist.length) {
							break;
						}

						await output({
							missionName: "searchResult",
							type: "pubmed",
							step,
							searchResults: response.body.esearchresult.idlist.map(
								(id) => ({
									provider: "pubmed",
									reference: id,
									failedToSend: false,
								}),
							),
							error: undefined,
						});
					}
				}
			},
		)
		.exhaustive();
}
