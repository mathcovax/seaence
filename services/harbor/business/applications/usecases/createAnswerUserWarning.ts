import { type PostId } from "@business/domains/common/post";
import { type UserEntity } from "@business/domains/entities/user";
import { AnswerUserWarningEntity, type AnswerUserWarningAnswerId } from "@business/domains/entities/warning/answer";
import { type UserWarningMakeUserBan, type UserWarningReason } from "@business/domains/entities/warning/base";
import { UsecaseHandler } from "@vendors/clean";
import { MakeUserBanUsecase } from "./makeUserBan";
import { userWarningRepository } from "../repositories/warning";
import { notificationRepository } from "../repositories/notification";

interface Input {
	makeUserBan: UserWarningMakeUserBan;
	reason: UserWarningReason;
	postId: PostId;
	answerId: AnswerUserWarningAnswerId;
	user: UserEntity;
}

export class CreateAnswerUserWarningUsecase extends UsecaseHandler.create({
	userWarningRepository,
	makeUserBanUsecase: MakeUserBanUsecase,
	notificationRepository,
}) {
	public async execute({ makeUserBan, reason, postId, answerId, user }: Input) {
		const warning = AnswerUserWarningEntity.create({
			id: this.userWarningRepository.generateUserWarningId(),
			makeUserBan,
			reason,
			userId: user.id,
			postId,
			answerId,
		});

		await this.userWarningRepository.save(warning);

		if (makeUserBan.value) {
			await Promise.all([
				this.makeUserBanUsecase({ user }),
				this.notificationRepository.createUserAnswerBanNotification({
					user,
					warningId: warning.id,
					postId,
					answerId,
					reason,
				}),
			]);
		} else {
			await this.notificationRepository.createUserAnswerWarningNotification({
				user,
				warningId: warning.id,
				postId,
				answerId,
				reason,
			});
		}

		return warning;
	}
}
