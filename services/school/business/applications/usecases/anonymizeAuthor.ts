import { type UserId } from "@business/domains/common/user";
import { UsecaseHandler } from "@vendors/clean";
import { RenameAuthorUsecase } from "./renameAuthor";

interface Input {
	authorId: UserId;
}

export class AnonymizeAuthorUsecase extends UsecaseHandler.create({
	renameAuthor: RenameAuthorUsecase,
}) {
	public execute({ authorId }: Input) {
		return this.renameAuthor({
			authorId,
			newAuthorName: null,
		});
	}
}
