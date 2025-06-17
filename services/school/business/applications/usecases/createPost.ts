import { UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { type NodeSameRawDocumentId, PostEntity, type PostContent, type PostTopic } from "@business/domains/entities/post";
import { notificationRepository } from "../repositories/notification";
import { type UserId, type Username } from "@business/domains/common/user";

interface Input {
	topic: PostTopic;
	content: PostContent;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	authorId: UserId;
	authorName: Username;
}

export class CreatePostUsecase extends UsecaseHandler.create({
	postRepository,
	notificationRepository,
}) {
	public async execute(
		{
			topic,
			content,
			nodeSameRawDocumentId,
			authorId,
			authorName,
		}: Input,
	) {
		const post = PostEntity.create({
			id: this.postRepository.generatePostId(),
			topic,
			content,
			nodeSameRawDocumentId,
			authorId,
			authorName,
		});

		await this.postRepository.save(post);

		await this.notificationRepository.enableReplyPostNotificationToAuthor(post);

		return post;
	}
}
