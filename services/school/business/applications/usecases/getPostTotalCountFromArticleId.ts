import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type ArticleId } from "@business/domains/entities/article";

interface Input {
	articleId: ArticleId;
}

export class GetPostTotalCountFromArticleIdUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ articleId }: Input) {
		return this.postRepository.getTotalCountByArticleId(
			articleId,
		);
	}
}
