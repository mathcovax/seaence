import { createSendSearchResultMissionUsecase, startSendSearchResultMissionUsecase } from "@interfaces/usecase";
import { deepLog } from "@interfaces/utils/deepLog";
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

const finishMission = await startSendSearchResultMissionUsecase.execute({
	mission,
});

deepLog(finishMission);
