import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { documentIdObjecter, documentSummaryObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { updateDocumentInFoldersUsecase } from "@interfaces/usecase";

asyncMessage.collections.updateDocument.on(
	async(updateDocumentPayload) => {
		const documentId = documentIdObjecter.unsafeCreate(updateDocumentPayload.value.documentId);
		const title = documentTitleObjecter.unsafeCreate(updateDocumentPayload.value.newTitle);
		const summary = documentSummaryObjecter.unsafeCreate(updateDocumentPayload.value.newAbstract);

		await updateDocumentInFoldersUsecase.execute({
			documentId,
			title,
			summary,
		});
	},
);

await asyncMessage
	.collections
	.updateDocument
	.start(true);
