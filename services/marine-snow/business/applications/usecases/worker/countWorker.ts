import { workerRepository } from "@business/applications/repositories/worker";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {

}

export const countWorkersUsecase = createUsecaseHandler(
	"countWorkers",
	{
		workerRepository,
	},
	({ workerRepository }, _input: Input) => workerRepository.count(),
);
