import { type UserWarningReason, type UserWarningMakeUserBan } from "@business/domains/entities/warning/base";
import { PostUserWarningEntity, type PostUserWarningPostId } from "@business/domains/entities/warning/post";
import { UsecaseHandler } from "@vendors/clean";
import { userWarningRepository } from "../repositories/warning";
import { MakeUserBanUsecase } from "./makeUserBan";
import { type UserEntity } from "@business/domains/entities/user";
import { notificationRepository } from "../repositories/notification";

interface Input {
	makeUserBan: UserWarningMakeUserBan;
	reason: UserWarningReason;
	postId: PostUserWarningPostId;
	user: UserEntity;
}

export class CreatePostUserWarningUsecase extends UsecaseHandler.create({
	userWarningRepository,
	makeUserBanUsecase: MakeUserBanUsecase,
	notificationRepository,
}) {
	public async execute({ makeUserBan, reason, postId, user }: Input) {
		const warning = PostUserWarningEntity.create({
			id: this.userWarningRepository.generateUserWarningId(),
			makeUserBan,
			reason,
			userId: user.id,
			postId,
		});

		await this.userWarningRepository.save(warning);

		if (makeUserBan.value) {
			await Promise.all([
				this.makeUserBanUsecase({ user }),
				this.notificationRepository.createUserPostBanNotification({
					user,
					warningId: warning.id,
					postId,
					reason,
				}),
			]);
		} else {
			await this.notificationRepository.createUserPostWarningNotification({
				user,
				warningId: warning.id,
				postId,
				reason,
			});
		}

		return warning;
	}
}
