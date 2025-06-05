import { UsecaseHandler } from "@vendors/clean";
import { bottleRepository } from "../repositories/bottle";
import { type Warning } from "../repositories/warning";

interface Input {
	warning: Warning;
}

export class CreateBanNotificationUsecase extends UsecaseHandler.create({
	bottleRepository,
}) {
	public execute({ warning }: Input) {
		return this.bottleRepository.createBanNotification(warning);
	}
}
