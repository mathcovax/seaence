import { type PostId } from "@business/domains/entities/post";
import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";

interface Input {
	id: PostId;
}

export class GetPostByIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ id }: Input) {
		return this.postRepository.findOneById(id);
	}
}
