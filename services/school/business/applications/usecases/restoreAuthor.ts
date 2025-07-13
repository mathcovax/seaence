import { type Username, type UserId } from "@business/domains/common/user";
import { UsecaseHandler } from "@vendors/clean";
import { RenameAuthorUsecase } from "./renameAuthor";

interface Input {
	authorId: UserId;
	newAuthorName: Username;
}

export class RestoreAuthorUsecase extends UsecaseHandler.create({
	renameAuthor: RenameAuthorUsecase,
}) {
	public execute({ authorId, newAuthorName }: Input) {
		return this.renameAuthor({
			authorId,
			newAuthorName,
		});
	}
}
