import { missionIdObjecter } from "@business/domains/entities/mission";
import { findPubMedSearchResultMissionUsecase, resumeSearchResultMissionUsecase } from "@interfaces/usecase";
import { TechnicalError } from "@vendors/clean/error";
import { program } from "commander";

program
	.requiredOption("-i, --id <char>");

program.parse();

const { id: rawId } = program.opts<Record<string, string>>();

const id = missionIdObjecter.throwCreate(rawId);

const mission = await findPubMedSearchResultMissionUsecase.execute({ id });

if (!mission) {
	throw new TechnicalError("not found pubMed search result mission", { id });
}

const result = await resumeSearchResultMissionUsecase.execute({ mission });

console.log(result);
