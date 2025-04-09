import { abysRepository } from "@business/applications/repositories/abys";
import { SendSearchResultMissionStepEntity } from "@business/domains/entities/mission/sendSearchResult/step";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";
import { startWorkerMission } from "@interfaces/workers";
import { type SupportedSendSearchResultMission } from "@interfaces/workers/missions/sendSearchResult";
import { EntityHandler, RepositoryError, toSimpleObject } from "@vendors/clean";

const minimalDecrement = 0;

abysRepository.default = {
	save() {
		throw new Error("Unsupport methods");
	},
	async *startSendSearchResultMission(mission) {
		const missionData: SupportedSendSearchResultMission = {
			...mission.toSimpleObject(),
			missionName: "sendSearchResult",
		};

		let quantityProcessed = 0;

		for await (const output of startWorkerMission(missionData)) {
			if (output instanceof Error) {
				return new RepositoryError(
					"worker-reject-error",
					{ error: output },
				);
			} else if (
				output.missionName !== "sendSearchResult"
			) {
				return new RepositoryError(
					"worker-return-wrong-result",
					{
						custom: {
							input: missionData,
							output: output,
						},
					},
				);
			}

			quantityProcessed += output.searchResults.length;

			const searchResults = output.searchResults.map(
				(searchResult) => EntityHandler.unsafeMapper(
					SearchResultEntity,
					searchResult,
				),
			);

			yield {
				searchResults: searchResults,
				step: EntityHandler.unsafeMapper(
					SendSearchResultMissionStepEntity,
					{
						missionId: missionData.id,
						quantityProcessed,
						faildedSearchResults: searchResults.filter(
							(searchResult) => searchResult.failedToSend,
						),
					},
				),
			};
		}
	},
};
