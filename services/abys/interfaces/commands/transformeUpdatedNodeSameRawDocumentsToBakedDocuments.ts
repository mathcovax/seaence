import "../repositories";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/transformeUpdatedNodeSameRawDocumentsToBakedDocuments";
import { bakedDocumentLanguageEnum, bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";
import { mongo } from "@interfaces/providers/mongo";
import { logger } from "@vendors/backend-logger";

const implementedNodeSameRawDocumentRepository = nodeSameRawDocumentRepository.use;

const transformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase
	= new TransformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase({
		nodeSameRawDocumentRepository: {
			...implementedNodeSameRawDocumentRepository,
			async *findUpdatedNode(...args) {
				const offset = 10;
				const zero = 0;
				let quantity = 0;
				for await (
					const nodeSameRawDocument of implementedNodeSameRawDocumentRepository.findUpdatedNode(...args)
				) {
					yield nodeSameRawDocument;
					quantity++;
					if (quantity % offset === zero) {
						logger(`Quantity Processed: ${quantity}`);
					}
				}

				logger(`Quantity Processed: ${quantity}`);
			},
		},
	});

const bakedDocumentLanguages = bakedDocumentLanguageEnum
	.toTuple()
	.map(
		(language) => bakedDocumentLanguageObjecter.unsafeCreate(language),
	);

const result = await transformeUpdatedNodeSameRawDocumentsToBakedDocumentsUsecase.execute({
	bakedDocumentLanguages,
	cookingMode: cookingModeObjecter.unsafeCreate("default"),
});

if (result instanceof Error) {
	logger(result);
}

await mongo.client.close();
