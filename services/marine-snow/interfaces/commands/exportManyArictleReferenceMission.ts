import { exportManyArticleReferenceUsecase } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger";
import { intObjecter } from "@vendors/clean";
import { program } from "commander";

program
	.requiredOption("-c, --concurrency <int>");

program.parse();

const { concurrency: rawConcurrency } = program.opts<Record<string, string>>();

const concurrency = intObjecter.throwCreate(Number(rawConcurrency));

const mission = await exportManyArticleReferenceUsecase.execute({ concurrency });

logger(mission);

if (mission instanceof Error) {
	throw mission;
}
