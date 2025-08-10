import { providerObjecter } from "@business/domains/common/provider";
import { ArticleReference } from "@business/domains/entities/articleReference";
import { exportOneArticleReferenceUsecase, findOneArticleReferenceUsecase } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger";
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
const referenceValue = ArticleReference.valueObjecter.unknownThrowCreate(rawReference);

const articleReference = await findOneArticleReferenceUsecase.execute({
	referenceValue,
	provider,
});

if (!articleReference) {
	throw new TechnicalError("Not found article reference.");
}

const mission = await exportOneArticleReferenceUsecase.execute({ articleReference });

logger(mission);

if (mission instanceof Error) {
	throw mission;
}
