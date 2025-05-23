import { UsecaseHandler } from "@vendors/clean";
import { answerRepository } from "../repositories/answer";
import { postRepository } from "../repositories/post";
import { type Username, type UserId } from "@business/domains/entities/user";

interface Input {
	authorId: UserId;
	newAuthorName: Username;
}

export class RenameAuthorUsecase extends UsecaseHandler.create({
	answerRepository,
	postRepository,
}) {
	public async execute({ authorId, newAuthorName }: Input) {
		for await (const post of this.postRepository.findByAuthorId(authorId)) {
			const updatedPost = post.renameAuthor(newAuthorName);
			await this.postRepository.save(updatedPost);
		}

		for await (const answer of this.answerRepository.findByAuthorId(authorId)) {
			const updatedAnswer = answer.renameAuthor(newAuthorName);
			await this.answerRepository.save(updatedAnswer);
		}
	}
}
