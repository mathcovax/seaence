import { type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { type SearchResultEntity } from "@business/domains/entities/searchResult";
import { type SimplifyObjectTopLevel } from "@duplojs/utils";
import { prismaClient } from "@interfaces/providers/prisma";
import { type EntityToSimpleObject } from "@vendors/clean";
import { match } from "ts-pattern";
import { pubmedSender } from "./senders/pubmed";
import { postMessage } from "@interfaces/workers/postMessage";

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

const minimalDecrement = 0;
const quantityPerPage = 50;

export async function mission(mission: SupportedSendSearchResultMission) {
	for (
		let decrementQuantity = mission.quantity;
		decrementQuantity > minimalDecrement;
		decrementQuantity -= quantityPerPage
	) {
		const prismaSearchResults = await prismaClient.searchResult.updateManyAndReturn({
			where: {
				selected: false,
			},
			data: {
				selected: true,
			},
			limit: decrementQuantity > quantityPerPage
				? quantityPerPage
				: decrementQuantity,
			select: {
				provider: true,
				reference: true,
				failedToSend: true,
			},
		});

		const searchResults = await Promise.all(
			prismaSearchResults.map(
				(searchResult) => match(searchResult)
					.with(
						{ provider: "pubmed" },
						(searchResult) => {
							const success = pubmedSender(searchResult.reference);

							return {
								...searchResult,
								failedToSend: !success,
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
	}
}
