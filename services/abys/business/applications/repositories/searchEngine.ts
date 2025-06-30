import { type BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface SearchEngineRepository extends RepositoryBase<never> {
	indexBakedDocument(bakedDocument: BakedDocumentEntity): Promise<void>;
}

export const searchEngineRepository = createRepositoryHandler<
	SearchEngineRepository
>();
