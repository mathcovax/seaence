import { type UserId } from "@business/domains/common/user";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type UserDocumentFolder, UserFindDocumentFolderByIdUsecase } from "./userFindDocumentFolderById";

interface Input {
	userId: UserId;
	documentFolderIds: DocumentFolderId[];
}

export class UserFindManyDocumentFolderByIdUsecase extends UsecaseHandler.create({
	userFindDocumentFolderByIdUsecase: UserFindDocumentFolderByIdUsecase,
}) {
	public async execute({ userId, documentFolderIds }: Input) {
		const userDocumentFolderPromises = documentFolderIds.map(
			async(documentFolderId) => this.userFindDocumentFolderByIdUsecase({
				userId,
				documentFolderId,
			}),
		);

		const result = await Promise.all(userDocumentFolderPromises);

		const userDocumentFolders = result
			.filter((result): result is UserDocumentFolder => result !== null && !(result instanceof UsecaseError));

		const errors = result
			.filter((result) => result instanceof UsecaseError);

		return {
			userDocumentFolders,
			errors,
		};
	}
}
