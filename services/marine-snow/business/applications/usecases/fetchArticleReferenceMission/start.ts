import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { type FetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input<
	GenericMission extends FetchArticleReferenceMissionEntity,
> {
	mission: GenericMission;
}

export class StartFetchArticleReferenceMissionUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
}) {
	public execute<
		GenericMission extends FetchArticleReferenceMissionEntity,
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
