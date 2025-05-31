import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { DocumentInFolderEntity, type NodeSameRawDocumentId, type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderUsecase } from "../documentFolder/computeDocumentQuantityInFolder";
import { type UserDocumentFolder, UserFindDocumentFolderByIdUsecase } from "../documentFolder/userFindDocumentFolderById";

interface Input {
	userDocumentFolder: UserDocumentFolder;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	documentInFolderName: DocumentInFolderName;
}

const maxDocumentInFolderQuantity = 50;

export class UserCreateDocumentInFolderUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	computeDocumentQuantityInFolderrUsecase: ComputeDocumentQuantityInFolderUsecase,
	userFindDocumentFolderByIdUsecase: UserFindDocumentFolderByIdUsecase,
}) {
	public async execute(
		{
			userDocumentFolder,
			nodeSameRawDocumentId,
			documentInFolderName,
		}: Input,
	) {
		const total = await this.documentInFolderRepository.countResultOfSearchDocumentInFolder(
			userDocumentFolder.value,
			null,
		);

		if (total.value >= maxDocumentInFolderQuantity) {
			return new UsecaseError("document-in-folder-max-quantity", { total });
		}

		const findedDocumentInFolder = await this.documentInFolderRepository
			.findDocumentInFolder(
				userDocumentFolder.value.id,
				nodeSameRawDocumentId,
			);

		if (findedDocumentInFolder) {
			return new UsecaseError("document-in-folder-already-exists", { findedDocumentInFolder });
		}

		const documentInFolder = DocumentInFolderEntity.create({
			name: documentInFolderName,
			nodeSameRawDocumentId,
			documentFolderId: userDocumentFolder.value.id,
		});

		await this.documentInFolderRepository.save(documentInFolder);

		await this.computeDocumentQuantityInFolderrUsecase({
			documentFolder: userDocumentFolder.value,
		});

		return documentInFolder;
	}
}

