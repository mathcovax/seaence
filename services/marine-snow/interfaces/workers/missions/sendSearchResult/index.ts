import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { prismaClient } from "@interfaces/providers/prisma";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { pubmedSender } from "./senders/pubmed";
import { postMessage } from "@interfaces/workers/postMessage";
import { deepLog } from "@interfaces/utils/deepLog";

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

const quantityPerPage = 10;

export async function mission(mission: SupportedSendSearchResultMission) {
	for (
		let incrementQuantity = 0;
		incrementQuantity <= mission.quantity;
		incrementQuantity += quantityPerPage
	) {
		const prismaSearchResults = await prismaClient.searchResult.updateManyAndReturn({
			where: {
				selected: false,
				failedToSend: false,
			},
			data: {
				selected: true,
			},
			limit: incrementQuantity + quantityPerPage > mission.quantity
				? mission.quantity - incrementQuantity
				: quantityPerPage,
			select: {
				provider: true,
				reference: true,
				failedToSend: true,
			},
		});

		if (!prismaSearchResults.length) {
			break;
		}

		const searchResults = await Promise.all(
			prismaSearchResults.map(
				(searchResult) => match(searchResult)
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
					.with(
						{ provider: "pedro" },
						(searchResult) => {
							throw new Error("unsupport provider");
						},
					)
					.with(
						{ provider: "sciencedirect" },
						(searchResult) => {
							throw new Error("unsupport provider");
						},
					)
					.exhaustive(),
			),
		);

		await output({
			missionName: "sendSearchResult",
			searchResults,
		});

		if (searchResults.find((searchResult) => searchResult.failedToSend)) {
			break;
		}
	}
}
