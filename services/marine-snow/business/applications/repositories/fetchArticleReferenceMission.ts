import { type FetchArticleReferenceMission } from "@business/domains/entities/fetchArticleReferenceMission";
import { type PubmedFetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission/pubmed";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type UnionFetchArticleReferenceMission =
	| PubmedFetchArticleReferenceMissionEntity;

export interface FetchArticleReferenceMissionRepository extends RepositoryBase<UnionFetchArticleReferenceMission> {
	generateId(): FetchArticleReferenceMission.Id;
	findOnePubmedMission(id: FetchArticleReferenceMission.Id): Promise<
		| PubmedFetchArticleReferenceMissionEntity
		| null
	>;
}

export const fetchArticleReferenceMissionRepository = createRepositoryHandler<
	FetchArticleReferenceMissionRepository
>();
