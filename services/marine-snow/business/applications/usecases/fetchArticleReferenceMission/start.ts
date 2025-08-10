import { fetchArticleReferenceMissionRepository, type UnionFetchArticleReferenceMission } from "@business/applications/repositories/fetchArticleReferenceMission";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input<
	GenericMission extends UnionFetchArticleReferenceMission,
> {
	mission: GenericMission;
}

export class StartFetchArticleReferenceMissionUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
}) {
	public execute<
		GenericMission extends UnionFetchArticleReferenceMission,
	>({ mission }: Input<GenericMission>) {
		if (mission.status.value !== "created" && mission.status.value !== "inRecovery") {
			return new UsecaseError("wrong-mission-status", {
				mission,
				expect: ["created", "resume"],
			});
		}

		const startedMission = mission.start();

		return this.fetchArticleReferenceMissionRepository.save(startedMission);
	}
}
