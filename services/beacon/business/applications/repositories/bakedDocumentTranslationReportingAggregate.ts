import { type BakedDocumentTranslationReportingAggregateEntity } from "@business/domains/entities/bakedDocumentTranslationReportingAggregate";
import { createRepositoryHandler, type Int, type RepositoryBase } from "@vendors/clean";

interface FindManyParams {
	page: Int;
	quantityPerPage: Int;
}

export interface BakedDocumentTranslationReportingAggregateRepository extends RepositoryBase<never> {
	findMany(params: FindManyParams): Promise<
		BakedDocumentTranslationReportingAggregateEntity[]
	>;
	countTotal(): Promise<Int>;
}

export const bakedDocumentTranslationReportingAggregateRepository = createRepositoryHandler<
	BakedDocumentTranslationReportingAggregateRepository
>();
