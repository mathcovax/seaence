import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { type UserId } from "@business/domains/common/user";
import { type BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindManyParams {
	bakedDocumentId: BakedDocumentId;
	page: Int;
	quantityPerPage: Int;
}

export interface BakedDocumentTranslationReportingRepository extends RepositoryBase<
	BakedDocumentTranslationReportingEntity
> {
	findOne(userId: UserId, bakedDocumentId: BakedDocumentId): Promise<
		| BakedDocumentTranslationReportingEntity
		| null
	>;

	findMany(params: FindManyParams): Promise<
		BakedDocumentTranslationReportingEntity[]
	>;

	deleteMany(bakedDocumentId: BakedDocumentId): Promise<void>;

	countTotalByBakedDocumentId(
		bakedDocumentId: BakedDocumentId
	): Promise<Int>;
}

export const bakedDocumentTranslationReportingRepository = createRepositoryHandler<
	BakedDocumentTranslationReportingRepository
>();
