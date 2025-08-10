import { providerObjecter } from "@business/domains/common/provider";
import { ArticleReference } from "@business/domains/entities/articleReference";
import { addOneArticleReferenceUsecase } from "@interfaces/usecase";
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
const referenceValue = ArticleReference.valueObjecter.unknownThrowCreate(rawReference);

const result = await addOneArticleReferenceUsecase.execute({
	provider,
	referenceValue,
});

logger(result);

if (result instanceof Error) {
	throw result;
}
