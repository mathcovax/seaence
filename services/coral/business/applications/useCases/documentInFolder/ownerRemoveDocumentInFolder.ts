import { C } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import type { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderUseCase } from "../documentFolder/computeDocumentQuantityInFolder";

interface Input {
	ownerDocumentInFolder: DocumentInFolder.Entity & DocumentInFolder.WithCheckedOwner;
}

export const OwnerRemoveDocumentInFolderUseCase = C.createUseCase(
	{
		DocumentInFolderRepository,
		DocumentFolderRepository,
		ComputeDocumentQuantityInFolderUseCase,
	},
	({
		documentInFolderRepository,
		documentFolderRepository,
		computeDocumentQuantityInFolderUseCase,
	}) => async(input: Input) => {
		await documentInFolderRepository.remove(input.ownerDocumentInFolder);
		const documentFolder = await documentFolderRepository.getByDocumentInFolder(
			input.ownerDocumentInFolder,
		);
		return computeDocumentQuantityInFolderUseCase({ documentFolder });
	},
);
