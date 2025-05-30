import { abysRepository } from "@business/applications/repositories/abys";
import { SendSearchResultMissionStepEntity } from "@business/domains/entities/mission/sendSearchResult/step";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { startWorkerMission } from "@interfaces/workers";
import { type SupportedSendSearchResultMission } from "@interfaces/workers/missions/sendSearchResult";
import { type SendOneSearchResultMissionOutput, type SupportedSendOneSearchResultMission } from "@interfaces/workers/missions/sendSearchResult/one";
import { EntityHandler, RepositoryError } from "@vendors/clean";

abysRepository.default = {
	save() {
		throw new RepositoryError("Unsupport methods");
	},
	async *startSendSearchResultMission(mission) {
		const missionData: SupportedSendSearchResultMission = {
			...mission.toSimpleObject(),
			missionName: "sendSearchResult",
		};

		let quantityProcessed = 0;

		for await (const { next, stop, output } of startWorkerMission(missionData)) {
			if (output instanceof Error) {
				await stop();

				yield new RepositoryError(
					"worker-reject-error",
					{ error: output },
				);
				break;
			} else if (
				output.missionName !== "sendSearchResult"
			) {
				await stop();

				yield new RepositoryError(
					"worker-return-wrong-result",
					{
						input: missionData,
						output: output,
					},
				);
				break;
			}

			next();

			quantityProcessed += output.searchResults.length;

			const searchResults = output.searchResults.map(
				(searchResult) => EntityHandler.unsafeMapper(
					SearchResultEntity,
					searchResult,
				),
			);

			yield {
				searchResults,
				step: EntityHandler.unsafeMapper(
					SendSearchResultMissionStepEntity,
					{
						missionId: missionData.id,
						quantityProcessed,
						faildedSearchResults: searchResults.filter(
							(searchResult) => searchResult.failedToSend.value,
						),
					},
				),
			};
		}
	},
	async startSendOneSearchResultMission(mission) {
		const missionData: SupportedSendOneSearchResultMission = {
			...mission.toSimpleObject(),
			missionName: "SendOneSearchResult",
		};

		let result: null | SendOneSearchResultMissionOutput = null;

		for await (const { next, stop, output } of startWorkerMission(missionData)) {
			if (output instanceof Error) {
				await stop();

				return new RepositoryError(
					"worker-reject-error",
					{ error: output },
				);
			} else if (
				output.missionName !== "SendOneSearchResult"
			) {
				await stop();

				return new RepositoryError(
					"worker-return-wrong-result",
					{
						input: missionData,
						output: output,
					},
				);
			}

			next();

			result = output;
		}

		if (!result) {
			return new RepositoryError(
				"missing-result",
			);
		}

		return EntityHandler.unsafeMapper(
			SearchResultEntity,
			result.searchResult,
		);
	},
};
