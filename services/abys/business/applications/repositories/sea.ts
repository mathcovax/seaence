import { type BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface SeaRepository extends RepositoryBase<never> {
	sendBakedDocument(bakedDocument: BakedDocumentEntity): Promise<void>;
}

export const seaRepository = createRepositoryHandler<
	SeaRepository
>();
