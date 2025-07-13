import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { postRepository } from "../repositories/post";
import { type Username, type UserId } from "@business/domains/common/user";

interface Input {
	authorId: UserId;
	newAuthorName: Username | null;
}

export class RenameAuthorUsecase extends UsecaseHandler.create({
	answerRepository,
	postRepository,
}) {
	public execute({ authorId, newAuthorName }: Input) {
		return Promise.all([
			this.answerRepository.renameAuthor(authorId, newAuthorName),
			this.postRepository.renameAuthor(authorId, newAuthorName),
		]);
	}
}
