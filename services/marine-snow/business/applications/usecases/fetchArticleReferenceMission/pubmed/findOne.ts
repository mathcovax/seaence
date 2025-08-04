import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { type FetchArticleReferenceMission } from "@business/domains/entities/fetchArticleReferenceMission";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	id: FetchArticleReferenceMission.Id;
}

export class FindOneFetchPubmedArticleReferenceMissionUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
}) {
	public execute({ id }: Input) {
		return this
			.fetchArticleReferenceMissionRepository
			.findOnePubmedMission(id);
	}
}
