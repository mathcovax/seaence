import { createUsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type ArticleId } from "@business/domains/entities/article";
import { type UserId } from "@business/domains/entities/user";

interface CreatePostInput {
	topic: PostTopic;
	content: PostContent;
	articleId: ArticleId;
	creatorId: UserId;
}

export const createPostUsecase = createUsecaseHandler(
	"createPost",
	{
		postRepository,
	},
	async(
		{ postRepository },
		{ topic, content, articleId, creatorId }: CreatePostInput,
	) => {
		const post = PostEntity.create({
			topic,
			content,
			articleId,
			creatorId,
		});

		await postRepository.save(post);

		return post;
	},
);
