import { UsecaseHandler } from "@vendors/clean";
import { replyToPostNotificationSettingRepository } from "../../repositories/notificationSetting/replyToPost";
import { type ReplyToPostNotificationSettingEntity } from "@business/domains/entities/setting/replyToPost";

interface Input {
	replyToPostNotificationSetting: ReplyToPostNotificationSettingEntity;
}

export class DisableReplyToPostNotificationSettingToPostUsecase extends UsecaseHandler.create({
	replyToPostNotificationSettingRepository,
}) {
	public async execute({ replyToPostNotificationSetting }: Input) {
		return this.replyToPostNotificationSettingRepository.delete(replyToPostNotificationSetting);
	}
}
