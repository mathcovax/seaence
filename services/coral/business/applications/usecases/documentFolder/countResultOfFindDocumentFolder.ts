import { type Text, UsecaseHandler } from "@vendors/clean";
import { type UserId } from "@business/domains/common/user";
import { documentFolderRepository } from "../../repositories/documentFolder";

interface Input {
	userId: UserId;
	partialDocumentFolderName: Text;
}

export class CountResultOfFindDocumentFolderUsecase extends UsecaseHandler.create({
	documentFolderRepository,
}) {
	public execute({ userId, partialDocumentFolderName }: Input) {
		return this.documentFolderRepository.countResultOfFindDocumentFolder(
			userId,
			partialDocumentFolderName,
		);
	}
}
