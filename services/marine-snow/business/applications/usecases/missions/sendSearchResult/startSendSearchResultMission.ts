import { intObjecter, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartMissionUsecase } from "../startMission";
import { sendSearchResultMissionResultDetailsObjecter, type SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { abysRepository } from "@business/applications/repositories/abys";
import { missionRepository } from "@business/applications/repositories/mission";

interface Input {
	mission: SendSearchResultMissionEntity;
}

const rawQuantityPerPage = 50;
const quantityPerPage = intObjecter.unsafeCreate(rawQuantityPerPage);

export class StartSendSearchResultMissionUsecase extends UsecaseHandler.create({
	startMission: StartMissionUsecase,
	searchResultRepository,
	abysRepository,
	missionRepository,
}) {
	public async execute({ mission }: Input) {
		const startedMission = await this.startMission({ mission });

		if (startedMission instanceof Error) {
			return startedMission;
		}

		const resultDetails = sendSearchResultMissionResultDetailsObjecter.unsafeCreate({
			failed: 0,
			success: 0,
		});

		for await (
			const selectedSearchResults of this.searchResultRepository
				.selectSearchResultToSendThem(startedMission.quantity, quantityPerPage)
		) {
			const result = await this.abysRepository.sendSearchResults(selectedSearchResults);

			if (result instanceof Error) {
				void await this.missionRepository.save(
					startedMission.failed(),
				);

				return new UsecaseError("error-when-send-search-result", { error: result });
			}

			await Promise.all(
				result.map(
					(searchResult) => {
						if (searchResult.status.value === "failedToSend") {
							resultDetails.value.failed++;
							return this.searchResultRepository.save(searchResult);
						}

						resultDetails.value.success++;
						return this.searchResultRepository.delete(searchResult);
					},
				),
			);
		}

		const succesMission = startedMission.successWithDetails(resultDetails);
		return this.missionRepository.save(succesMission);
	}
}
