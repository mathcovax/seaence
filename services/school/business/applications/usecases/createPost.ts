import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type Article } from "@business/domains/common/article";
import { type User } from "@business/domains/common/user";

interface Input {
	topic: PostTopic;
	content: PostContent;
	article: Article;
	author: User;
}

export class CreatePostUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ topic, content, article, author }: Input) {
		const post = PostEntity.create({
			id: this.postRepository.generatePostId(),
			topic,
			content,
			article,
			author,
		});

		return this.postRepository.save(post);
	}
}
