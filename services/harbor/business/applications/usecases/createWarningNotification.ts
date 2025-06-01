import { UsecaseHandler } from "@vendors/clean";
import { type Warning } from "../repositories/warning";
import { bottleRepository } from "../repositories/bottle";

interface Input {
	warning: Warning;
}

export class CreateWarningNotificationUsecase extends UsecaseHandler.create({
	bottleRepository,
}) {
	public execute({ warning }: Input) {
		return this.bottleRepository.createWarningNotification(warning);
	}
}
