import { asyncPipe, C, E, unwrap } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import type { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";

interface Input {
	documentFolderName: DocumentFolder.Name;
	userId: UserId;
}

export const CreateDocumentFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => async(input: Input) => {
		const findedDocumentFolder = await documentFolderRepository.findByName(input);

		if (E.isRight(findedDocumentFolder)) {
			return E.left("document-folder-already-exist", unwrap(findedDocumentFolder));
		}

		const quantityOfDocumentFolder = await documentFolderRepository.getQuantityOfOwner(
			input.userId,
		);

		if (C.greaterThan(quantityOfDocumentFolder, DocumentFolder.MaxQuantity)) {
			return E.left("document-folder-max-quantity");
		}

		return asyncPipe(
			DocumentFolder.create({
				id: documentFolderRepository.generateId(),
				userId: input.userId,
				name: input.documentFolderName,
			}),
			documentFolderRepository.save,
			E.success,
		);
	},
);
