import { providerObjecter } from "@business/domains/common/provider";
import { searchResultReferenceObjecter } from "@business/domains/entities/searchResult";
import { addOneSearchResultUsecase } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger";
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

const result = await addOneSearchResultUsecase.execute({
	provider,
	reference,
});

logger(result);
