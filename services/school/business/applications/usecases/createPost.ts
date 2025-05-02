import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type Document } from "@business/domains/common/document";
import { type User } from "@business/domains/common/user";

interface Input {
	topic: PostTopic;
	content: PostContent;
	document: Document;
	author: User;
}

export class CreatePostUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ topic, content, document, author }: Input) {
		const post = PostEntity.create({
			id: this.postRepository.generatePostId(),
			topic,
			content,
			document,
			author,
		});

		return this.postRepository.save(post);
	}
}
