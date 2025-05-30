import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type UserId } from "@business/domains/common/user";
import { type BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface BakedDocumentTranslationReportingRepository extends RepositoryBase<
	BakedDocumentTranslationReportingEntity
> {
	find(userId: UserId, bakedDocumentId: BakedDocumentId): Promise<
		| BakedDocumentTranslationReportingEntity
		| null
	>;
}

export const bakedDocumentTranslationReportingRepository = createRepositoryHandler<
	BakedDocumentTranslationReportingRepository
>();
