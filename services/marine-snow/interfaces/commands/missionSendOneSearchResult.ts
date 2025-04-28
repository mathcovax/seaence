import { providerObjecter } from "@business/domains/common/provider";
import { searchResultObjecter } from "@business/domains/common/searchResult";
import { searchResultReferenceObjecter } from "@business/domains/entities/searchResult";
import { createSendOneSearchResultMissionUsecase, findOneSearchResultUsecase, startSendOneSearchResultMissionUsecase } from "@interfaces/usecase";
import { deepLog } from "@interfaces/utils/deepLog";
import { TechnicalError } from "@vendors/clean/error";
import { program } from "commander";

program
	.requiredOption("-p, --provider <char>")
	.requiredOption("-r, --reference <char>");

program.parse();

const {
	provider: rawProvider,
	reference: rawReference,
} = program.opts<Record<string, string | undefined>>();

const provider = providerObjecter.unknownThrowCreate(rawProvider);
const reference = searchResultReferenceObjecter.unknownThrowCreate(rawReference);

const searchResult = await findOneSearchResultUsecase.execute({
	reference,
	provider,
});

if (!searchResult) {
	throw new TechnicalError("Not found search result.");
}

const valueSearchResult = searchResultObjecter.throwCreate(searchResult);

const mission = await createSendOneSearchResultMissionUsecase.execute({ valueSearchResult });
const finishMission = await startSendOneSearchResultMissionUsecase.execute({ mission });

deepLog(finishMission);
