import { type UserId } from "@business/domains/common/user";
import { EntityHandler, type GetValueObject, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { documentFolderRepository } from "@business/applications/repositories/documentFolder";

interface Input {
	userId: UserId;
	documentFolderId: DocumentFolderId;
}

export const userDocumentFolderObjecter = EntityHandler.createEntityObjecter(
	"userDocumentFolder",
	DocumentFolderEntity,
);

export type UserDocumentFolder = GetValueObject<typeof userDocumentFolderObjecter>;

export class UserFindDocumentFolderByIdUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public async execute({ userId, documentFolderId }: Input) {
		const findedDocumentFolder = await this.documentFolderRepository.findDocumentFolderById(documentFolderId);

		if (!findedDocumentFolder) {
			return null;
		} else if (findedDocumentFolder.userId.value !== userId.value) {
			return new UsecaseError("wrong-proprietary", { findedDocumentFolder });
		}

		return userDocumentFolderObjecter.unsafeCreate(findedDocumentFolder);
	}
}
