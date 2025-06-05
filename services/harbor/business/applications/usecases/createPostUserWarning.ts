import { type BaseUserWarningReason, type BaseUserWarningMakeUserBan } from "@business/domains/entities/warning/base";
import { PostUserWarningEntity, type PostUserWarningPostId } from "@business/domains/entities/warning/post";
import { UsecaseHandler } from "@vendors/clean";
import { userWarningRepository } from "../repositories/warning";
import { CreateWarningNotificationUsecase } from "./createWarningNotification";
import { userRepository } from "../repositories/user";
import { MakeUserBanUsecase } from "./makeUserBan";
import { type UserEntity } from "@business/domains/entities/user";
import { CreateBanNotificationUsecase } from "./createBanNotification";

interface Input {
	makeUserBan: BaseUserWarningMakeUserBan;
	reason: BaseUserWarningReason;
	postId: PostUserWarningPostId;
	user: UserEntity;
}

export class CreatePostUserWarningUsecase extends UsecaseHandler.create({
	userWarningRepository,
	userRepository,
	createWarningNotificationUsecase: CreateWarningNotificationUsecase,
	createBanNotificationUsecase: CreateBanNotificationUsecase,
	makeUserBanUsecase: MakeUserBanUsecase,
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

		if (makeUserBan) {
			await Promise.all([
				this.makeUserBanUsecase({ user }),
				this.createBanNotificationUsecase({ warning }),
			]);
		} else {
			await this.createWarningNotificationUsecase({ warning });
		}

		return warning;
	}
}
