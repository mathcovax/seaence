import { type SingleSendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/single";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { prismaClient } from "@interfaces/providers/prisma";
import { deepLog } from "@interfaces/utils/deepLog";
import { postMessage } from "@interfaces/workers/postMessage";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { pubmedSender } from "./senders/pubmed";

export type SupportedSingleSendSearchResultMission = SimplifyObjectTopLevel<
	(
		| (EntityToSimpleObject<typeof SingleSendSearchResultMissionEntity>)
	) & {
		missionName: "singleSendSearchResult";
	}
>;

export type SingleSendSearchResultMissionOutput = SimplifyObjectTopLevel<
	{
		missionName: "singleSendSearchResult";
		searchResult: EntityToSimpleObject<typeof SearchResultEntity>;
	}
>;

function output(data: SingleSendSearchResultMissionOutput) {
	return postMessage(data);
}

export async function mission(mission: SupportedSingleSendSearchResultMission) {
	const prismaSearchResult = await prismaClient.searchResult.update({
		where: {
			id: {
				provider: mission.searchResult.provider,
				reference: mission.searchResult.reference,
			},
		},
		data: {
			selected: true,
		},
	});

	const resultSearchResult = await match(prismaSearchResult)
		.with(
			{ provider: "pubmed" },
			async(searchResult) => {
				const success = await pubmedSender(searchResult.reference);

				if (success instanceof Error) {
					deepLog({
						searchResult,
						success,
					});
				}

				return {
					...searchResult,
					failedToSend: success instanceof Error,
				};
			},
		)
		.exhaustive();

	await output({
		missionName: "singleSendSearchResult",
		searchResult: resultSearchResult,
	});
}
