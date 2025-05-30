import { type ReportingId } from "@business/domains/entities/reporting";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface ReportingRepository extends RepositoryBase<never> {
	generateId(): ReportingId;
}

export const reportingRepository = createRepositoryHandler<
	ReportingRepository
>();
