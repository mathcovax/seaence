import { type PostEntity } from "@business/domains/entities/post";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { postRepository } from "../repositories/post";
import { warningRepository } from "../repositories/warning";
import { type WarningMakeUserBan, type WarningReason } from "@business/domains/entities/warning";

interface Input {
	post: PostEntity;
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
}

export class IndicatePostIsNotCompliantAndCreateWarningUsecase extends UsecaseHandler.create({
	postRepository,
	warningRepository,
}) {
	public async execute({ post, makeUserBan, reason }: Input) {
		if (!post.isUnprocessed()) {
			return new UsecaseError("wrong-status", { post });
		}

		const { author } = post;

		const updatedPost = post.updateStatus("notCompliant");

		await this.postRepository.save(updatedPost);

		await this.warningRepository.createWarning({
			makeUserBan,
			reason,
			contentCreatorId: author.value.id,
			postId: updatedPost.id,
		});

		return updatedPost;
	}
}
