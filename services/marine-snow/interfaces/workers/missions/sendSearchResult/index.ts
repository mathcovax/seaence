import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { getTypedEntries, type SimplifyObjectTopLevel } from "@duplojs/utils";
import { prismaClient } from "@interfaces/providers/prisma";
import { type EntityToSimpleObject } from "@vendors/clean";
import { pubmedSender } from "./senders/pubmed";
import { postMessage } from "@interfaces/workers/postMessage";
import { deepLog } from "@interfaces/utils/deepLog";
import { match } from "ts-pattern";

export type SupportedSendSearchResultMission = SimplifyObjectTopLevel<
	(
		| (EntityToSimpleObject<typeof SendSearchResultMissionEntity>)
	) & {
		missionName: "sendSearchResult";
	}
>;

export type SendSearchResultMissionOutput = SimplifyObjectTopLevel<
	{
		missionName: "sendSearchResult";
		searchResults: EntityToSimpleObject<typeof SearchResultEntity>[];
	}
>;

function output(data: SendSearchResultMissionOutput) {
	return postMessage(data);
}

export async function mission(mission: SupportedSendSearchResultMission) {
	while (true) {
		const prismaSearchResults = await prismaClient.searchResult.updateManyAndReturn({
			where: {
				selected: false,
				failedToSend: false,
			},
			data: {
				selected: true,
			},
			limit: mission.concurrency,
			select: {
				provider: true,
				reference: true,
				failedToSend: true,
			},
		});

		if (!prismaSearchResults.length) {
			break;
		}

		const searchResults = (
			await Promise
				.all(
					getTypedEntries(
						Object.groupBy(prismaSearchResults, ({ provider }) => provider),
					).map(
						([provider, groupedSearchResults]) => match(provider)
							.with(
								"pubmed",
								async() => {
									const result = await pubmedSender(
										groupedSearchResults.map(({ reference }) => reference),
									);

									if (result instanceof Error) {
										deepLog(result);

										return groupedSearchResults.map(
											(searchResult) => ({
												...searchResult,
												failedToSend: true,
											}),
										);
									}

									return result.map<
										SendSearchResultMissionOutput["searchResults"][number]
									>(
										({ reference, error }) => {
											if (error) {
												deepLog(error);
											}

											return {
												provider: "pubmed",
												reference,
												failedToSend: !!error,
											};
										},
									);
								},
							)
							.exhaustive(),
					),
				)
		).flat();

		await output({
			missionName: "sendSearchResult",
			searchResults,
		});

		if (searchResults.find((searchResult) => searchResult.failedToSend)) {
			break;
		}
	}
}
