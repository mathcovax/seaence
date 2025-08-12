import { UsecaseHandler } from "@vendors/clean";
import { documentInFolderRepository } from "../../repositories/documentInFolder";
import { DocumentInFolderEntity, type NodeSameRawDocumentId, type DocumentInFolderName } from "@business/domains/entities/documentInFolder";
import { ComputeDocumentQuantityInFolderUsecase } from "../documentFolder/computeDocumentQuantityInFolder";
import { UserFindDocumentFolderByIdUsecase } from "../documentFolder/userFindDocumentFolderById";
import { type UserDocumentFolderWithCapacity } from "../documentFolder/userCheckDocumentFolderCapacity";

interface Input {
	userDocumentFoldersWithCapacity: UserDocumentFolderWithCapacity[];
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	documentInFolderName: DocumentInFolderName;
}

export class UserCreateDocumentInManyFoldersUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
	computeDocumentQuantityInFolderUsecase: ComputeDocumentQuantityInFolderUsecase,
	userFindDocumentFolderByIdUsecase: UserFindDocumentFolderByIdUsecase,
}) {
	public async execute({
		userDocumentFoldersWithCapacity,
		nodeSameRawDocumentId,
		documentInFolderName,
	}: Input) {
		const documentInFolderPromises = userDocumentFoldersWithCapacity
			.map(async(userDocumentFolderWithCapacity) => {
				const existingDocumentInFolder = await this.documentInFolderRepository
					.findDocumentInFolder(
						userDocumentFolderWithCapacity.value.id,
						nodeSameRawDocumentId,
					);

				if (existingDocumentInFolder) {
					return existingDocumentInFolder;
				}

				const newDocumentInFolder = DocumentInFolderEntity
					.create({
						name: documentInFolderName,
						nodeSameRawDocumentId,
						documentFolderId: userDocumentFolderWithCapacity.value.id,
						userId: userDocumentFolderWithCapacity.value.userId,
					});

				await this.documentInFolderRepository.save(newDocumentInFolder);

				await this.computeDocumentQuantityInFolderUsecase({
					documentFolder: userDocumentFolderWithCapacity.value,
				});

				return newDocumentInFolder;
			});

		const documentsInFolder = await Promise.all(documentInFolderPromises);

		return documentsInFolder;
	}
}
