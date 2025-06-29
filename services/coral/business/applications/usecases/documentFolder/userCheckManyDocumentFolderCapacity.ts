import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type UserDocumentFolder } from "./userFindDocumentFolderById";
import { UserCheckDocumentFolderCapacityUsecase, type UserDocumentFolderWithCapacity } from "./userCheckDocumentFolderCapacity";

interface Input {
	userDocumentFolders: UserDocumentFolder[];
}

export class UserCheckManyDocumentFolderCapacityUsecase extends UsecaseHandler.create({
	userCheckDocumentFolderCapacityUsecase: UserCheckDocumentFolderCapacityUsecase,
}) {
	public execute({ userDocumentFolders }: Input) {
		const result = userDocumentFolders
			.map(
				(userDocumentFolder) => this.userCheckDocumentFolderCapacityUsecase(
					{ userDocumentFolder },
				),
			);

		const userDocumentFoldersWithCapacity = result
			.filter(
				(result): result is UserDocumentFolderWithCapacity => result !== null
				&& !(result instanceof UsecaseError),
			);

		const errors = result
			.filter((result) => result instanceof UsecaseError);

		return {
			userDocumentFoldersWithCapacity,
			errors,
		};
	}
}
