import { type SearchResultMission } from "@business/applications/repositories/scienceDatabase";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { StartSearchResultMissionUsecase } from "./startSearchResultMission";

interface Input<
	GenericMission extends SearchResultMission,
> {
	mission: GenericMission;
}

export class ResumeSearchResultMissionUsecase extends UsecaseHandler.create({
	startSearchResultMission: StartSearchResultMissionUsecase,
}) {
	public execute<
		GenericMission extends SearchResultMission,
	>({ mission }: Input<GenericMission>) {
		if (mission.status.value !== "failed") {
			return new UsecaseError("wrong-mission-status", {
				mission,
				expect: "failed",
			});
		}

		const resumeMission = mission.resume();

		return this.startSearchResultMission({ mission: resumeMission });
	}
}
