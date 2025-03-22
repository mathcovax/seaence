import { queueRepository } from "@business/applications/repositories/queue";
import { createUsecaseHandler } from "@vendors/clean";

interface Input {

}

export const getFirstMissionOfTheQueueUsecase = createUsecaseHandler(
	"getFirstMissionOfTheQueue",
	{
		queueRepository,
	},
	({ queueRepository }, _input: Input) => queueRepository.getFirst(),
);
