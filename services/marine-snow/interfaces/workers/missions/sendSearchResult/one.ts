import { type SendOneSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/one";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { prismaClient } from "@interfaces/providers/prisma";
import { postMessage } from "@interfaces/workers/postMessage";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { pubmedSender } from "./senders/pubmed";
import { logger } from "@vendors/backend-logger";

export type SupportedSendOneSearchResultMission = SimplifyObjectTopLevel<
	(
		| (EntityToSimpleObject<typeof SendOneSearchResultMissionEntity>)
	) & {
		missionName: "SendOneSearchResult";
	}
>;

export type SendOneSearchResultMissionOutput = SimplifyObjectTopLevel<
	{
		missionName: "SendOneSearchResult";
		searchResult: EntityToSimpleObject<typeof SearchResultEntity>;
	}
>;

function output(data: SendOneSearchResultMissionOutput) {
	return postMessage(data);
}

export async function mission(mission: SupportedSendOneSearchResultMission) {
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
				const result = await pubmedSender([searchResult.reference]);

				if (result instanceof Error) {
					logger({
						searchResult,
						result,
					});
				}

				return {
					...searchResult,
					failedToSend: result instanceof Error,
				};
			},
		)
		.exhaustive();

	await output({
		missionName: "SendOneSearchResult",
		searchResult: resultSearchResult,
	});
}
