import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { type FetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input<
	GenericMission extends FetchArticleReferenceMissionEntity,
> {
	mission: GenericMission;
}

export class RecoveryFetchArticleReferenceMissionUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
}) {
	public execute<
		GenericMission extends FetchArticleReferenceMissionEntity,
	>({ mission }: Input<GenericMission>) {
		if (mission.status.value !== "failed") {
			return new UsecaseError("wrong-mission-status", {
				mission,
				expect: "failed",
			});
		}

		const recoveredMission = mission.recovery();

		return this.fetchArticleReferenceMissionRepository.save(recoveredMission);
	}
}
