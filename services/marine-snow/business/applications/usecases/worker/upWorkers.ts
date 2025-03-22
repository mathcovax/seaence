import { workerRepository } from "@business/applications/repositories/worker";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	quantity: number;
}

export const upWorkersUsecase = createUsecaseHandler(
	"upWorkers",
	{
		workerRepository,
	},
	({ workerRepository }, { quantity }: Input) => workerRepository.up(quantity),
);
