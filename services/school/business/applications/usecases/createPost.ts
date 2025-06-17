import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeSameRawDocumentId, PostEntity, type PostContent, type PostTopic, type PostAuthor } from "@business/domains/entities/post";
import { notificationRepository } from "../repositories/notification";

interface Input {
	topic: PostTopic;
	content: PostContent;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	author: PostAuthor;
}

export class CreatePostUsecase extends UsecaseHandler.create({
	postRepository,
	notificationRepository,
}) {
	public async execute({ topic, content, nodeSameRawDocumentId, author }: Input) {
		const post = PostEntity.create({
			id: this.postRepository.generatePostId(),
			topic,
			content,
			nodeSameRawDocumentId,
			author,
		});

		await this.postRepository.save(post);

		await this.notificationRepository.enableNotification(post, author.value);

		return post;
	}
}
