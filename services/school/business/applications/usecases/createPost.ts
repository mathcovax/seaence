import { createUsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type PostCreator, PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type ArticleId } from "@business/domains/entities/article";
interface Input {
	topic: PostTopic;
	content: PostContent;
	articleId: ArticleId;
	creator: PostCreator;
}

export const createPostUsecase = createUsecaseHandler(
	"createPost",
	{
		postRepository,
	},
	async(
		{ postRepository },
		{ topic, content, articleId, creator }: Input,
	) => {
		const post = PostEntity.create({
			postId: await postRepository.generateId(),
			topic,
			content,
			articleId,
			creator,
		});

		return postRepository.save(post);
	},
);
