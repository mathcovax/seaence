import { notificationRepository } from "@business/applications/repositories/notification";
import { notificationSettingRepository } from "@business/applications/repositories/notificationSetting";
import { userRepository } from "@business/applications/repositories/user";
import { type UserEntity } from "@business/domains/entities/user";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	user: UserEntity;
}

export class AnonymizeUserUsecase extends UsecaseHandler.create({
	userRepository,
	notificationRepository,
	notificationSettingRepository,
}) {
	public async execute({ user }: Input) {
		if (user.anonymized) {
			return new UsecaseError("user-already-anonymized", { user });
		}

		const anonymizedUser = user.anonymize();

		await this.userRepository.save(anonymizedUser);

		return Promise.all([
			this.notificationRepository.deleteUserNotification(user),
			this.notificationSettingRepository.deleteUserSettings(user),
		]);
	}
}
