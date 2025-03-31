import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type PostCreator, PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type ArticleId } from "@business/domains/entities/article";
interface Input {
	topic: PostTopic;
	content: PostContent;
	articleId: ArticleId;
	creator: PostCreator;
}

export class CreatePostUsecase extends UsecaseHandler.create(
	{
		postRepository,
	},
) {
	public execute({ topic, content, articleId, creator }: Input) {
		const post = PostEntity.create({
			postId: this.postRepository.generatePostId(),
			topic,
			content,
			articleId,
			creator,
		});

		return this.postRepository.save(post);
	}
}
