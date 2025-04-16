import { createSendSearchResultMissionUsecase, startSendSearchResultMissionUsecase } from "@interfaces/usecase";
import { deepLog } from "@interfaces/utils/deepLog";
import { intObjecter } from "@vendors/clean";
import { program } from "commander";

program
	.option("-q, --quantity <int>");

program.parse();

const { quantity: rawQuantity } = program.opts<Record<string, string | undefined>>();

const defaultQuantity = 2147483647;

const quantity = intObjecter.throwCreate(rawQuantity ? Number(rawQuantity) : defaultQuantity);

const mission = await createSendSearchResultMissionUsecase.execute({
	quantity,
});

const finishMission = await startSendSearchResultMissionUsecase.execute({
	mission,
});

deepLog(finishMission);
