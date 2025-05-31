import { type Text, UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../../repositories/documentFolder";

interface Input {
	userId: UserId;
	partialDocumentFolderName: Text | null;
}

export class UserCountResultOfSearchDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, partialDocumentFolderName }: Input) {
		return this.documentFolderRepository.countResultOfSearchDocumentFolder(
			userId,
			partialDocumentFolderName,
		);
	}
}
