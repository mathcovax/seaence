import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";

export class GetTotalCountOfUnprocessedPostsUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute() {
		return this.postRepository.getTotalCountOfUnprocessedPosts();
	}
}
