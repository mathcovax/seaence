import { type WarningReason, type WarningMakeUserBan } from "@business/domains/entities/warning";
import { PostWarningEntity, type PostWarningPostId } from "@business/domains/entities/warning/postWarning";
import { UsecaseHandler } from "@vendors/clean";
import { warningRepository } from "../repositories/warning";
import { CreateWarningNotificationUsecase } from "./createWarningNotification";

interface Input {
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
	postId: PostWarningPostId;
}

export class CreatePostWarningUsecase extends UsecaseHandler.create({
	warningRepository,
	createWarningNotificationUsecase: CreateWarningNotificationUsecase,
}) {
	public async execute({ makeUserBan, reason, postId }: Input) {
		const warning = await this.warningRepository.save(
			PostWarningEntity.create({
				id: this.warningRepository.generateWarningId(),
				makeUserBan,
				reason,
				postId,
			}),
		);

		await this.createWarningNotificationUsecase({ warning });

		return warning;
	}
}
