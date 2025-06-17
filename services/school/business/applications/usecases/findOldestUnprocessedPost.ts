import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";

export class FindOldestUnprocessedPostUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute() {
		return this.postRepository.findOldestUnprocessedPost();
	}
}
