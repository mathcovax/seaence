import { type ExportArticleReferenceMission } from "@business/domains/entities/exportArticleReferenceMission";
import { type ExportManyArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/many";
import { type ExportOneArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/one";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

type ExportArticleReferenceMissionUnion =
	| ExportOneArticleReferenceMissionEntity
	| ExportManyArticleReferenceMissionEntity;

export interface ExportArticleReferenceMissionRepository extends RepositoryBase<ExportArticleReferenceMissionUnion> {
	generateId(): ExportArticleReferenceMission.Id;
}

export const exportArticleReferenceMissionRepository = createRepositoryHandler<
	ExportArticleReferenceMissionRepository
>();
