import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeDocumentId, PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { type User } from "@business/domains/common/user";

interface Input {
	topic: PostTopic;
	content: PostContent;
	nodeDocumentId: NodeDocumentId;
	author: User;
}

export class CreatePostUsecase extends UsecaseHandler.create({
	postRepository,
}) {
	public execute({ topic, content, nodeDocumentId, author }: Input) {
		const post = PostEntity.create({
			id: this.postRepository.generatePostId(),
			topic,
			content,
			nodeDocumentId,
			author,
		});

		return this.postRepository.save(post);
	}
}
