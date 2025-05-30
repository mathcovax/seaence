import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { documentIdObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { renameDocumentInFoldersUsecase } from "@interfaces/usecase";

asyncMessage.collections.renameDocument.on(
	async(renameDocumentPayload) => {
		const documentId = documentIdObjecter.unsafeCreate(renameDocumentPayload.value.documentId);
		const newTitle = documentTitleObjecter.unsafeCreate(renameDocumentPayload.value.newTitle);

		await renameDocumentInFoldersUsecase.execute({
			documentId,
			newTitle,
		});
	},
);

await asyncMessage
	.collections
	.renameDocument
	.start(true);
