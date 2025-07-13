import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocument";
import { type CookingMode } from "@business/domains/common/cookingMode";
import { type NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface UpdateTranslationParams {
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	cookingMode: CookingMode;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

export interface BakedDocumentRepository extends RepositoryBase<never> {
	updateTranslation(params: UpdateTranslationParams): Promise<void>;
}

export const bakedDocumentRepository = createRepositoryHandler<
	BakedDocumentRepository
>();
