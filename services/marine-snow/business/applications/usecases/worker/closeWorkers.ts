import { workerRepository } from "@business/applications/repositories/worker";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {
	quantity: number;
}

export const closeWorkersUsecase = createUsecaseHandler(
	"closeWorkers",
	{
		workerRepository,
	},
	async({ workerRepository }, { quantity }: Input) => workerRepository.close(quantity),
);
