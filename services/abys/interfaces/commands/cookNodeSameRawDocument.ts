import "../repositories";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { CookNodeSameRawDocumentsUsecase } from "@business/applications/usecases/nodeSameRawDocument/cookNodeSameRawDocuments";
import { mongo } from "@interfaces/providers/mongo";

const implementedNodeSameRawDocumentRepository = nodeSameRawDocumentRepository.use;

const cookNodeSameRawDocumentsUsecase = new CookNodeSameRawDocumentsUsecase({
	nodeSameRawDocumentRepository: {
		...implementedNodeSameRawDocumentRepository,
		async *findUpdatedNode(...args) {
			const offset = 10;
			const zero = 0;
			let quantity = 0;
			for await (const nodeSameRawDocument of implementedNodeSameRawDocumentRepository.findUpdatedNode(...args)) {
				yield nodeSameRawDocument;
				quantity++;
				if (quantity % offset === zero) {
					console.log(`Quantity Processed: ${quantity}`);
				}
			}

			console.log(`Quantity Processed: ${quantity}`);
		},
	},
});

await cookNodeSameRawDocumentsUsecase.execute({});

await mongo.client.close();
