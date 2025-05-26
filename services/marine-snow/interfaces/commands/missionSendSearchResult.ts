import { abysRepository } from "@business/applications/repositories/abys";
import { StartSendSearchResultMissionUsecase } from "@business/applications/usecases/missions/sendSearchResult/startSendSearchResultMission";
import { createSendSearchResultMissionUsecase } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger";
import { intObjecter } from "@vendors/clean";
import { program } from "commander";

program
	.requiredOption("-c, --concurrency <int>");

program.parse();

const { concurrency: rawConcurrency } = program.opts<Record<string, string>>();

const concurrency = intObjecter.throwCreate(Number(rawConcurrency));

const mission = await createSendSearchResultMissionUsecase.execute({
	concurrency,
});

const implementedAbysRepository = abysRepository.use;

const startSendSearchResultMissionUsecase = new StartSendSearchResultMissionUsecase({
	abysRepository: {
		...implementedAbysRepository,
		async *startSendSearchResultMission(...args) {
			for await (const result of implementedAbysRepository.startSendSearchResultMission(...args)) {
				if (!(result instanceof Error)) {
					logger(`Quantity Processed: ${result.step.quantityProcessed.value}`);
				}
				yield result;
			}
		},
	},
});

const finishMission = await startSendSearchResultMissionUsecase.execute({
	mission,
});

logger(finishMission);
