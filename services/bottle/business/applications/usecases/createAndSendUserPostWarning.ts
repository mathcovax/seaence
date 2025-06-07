import { type UserPostWarningPostId } from "@business/domains/entities/notification/userPostWarning";
import { UsecaseHandler } from "@vendors/clean";
import { notificationRepository } from "../repositories/notification";
import { type UserId } from "@business/domains/entities/user";

interface Input {
	postId: UserPostWarningPostId;
	userId: UserId;
}

export class CreateAndSendUserPostWarningUsecase extends UsecaseHandler.create({
	notificationRepository,
}) {
	public async execute({ postId, userId }: Input) {
		//TODO: finish it when @ZeRiix finished rework of notification system
	}
}
