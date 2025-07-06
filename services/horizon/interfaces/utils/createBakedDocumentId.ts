import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

interface CreateBakedDocumentIdParams {
	nodeSameRawDocumentId: string;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

export function createBakedDocumentId(
	{
		nodeSameRawDocumentId,
		bakedDocumentLanguage,
	}: CreateBakedDocumentIdParams,
) {
	return `${nodeSameRawDocumentId}_${bakedDocumentLanguage}`;
}
