import { articleTypeObjecter } from "@business/domains/common/articleType";
import { program } from "commander";
import { createFetchPubmedArticleReferenceMissionUsecase } from "@interfaces/usecase";
import { dateYYYYMMDDIntervalObjecter } from "@vendors/clean";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { logger } from "@vendors/backend-logger";
import { FetchPubmedArticleReferencesUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/pubmed";

program
	.requiredOption("-a, --articleType <char>")
	.requiredOption("-t, --dateTo <char>")
	.requiredOption("-f, --dateFrom <char>");

program.parse();

const {
	articleType: rawArticleType,
	dateTo: ramDateTo,
	dateFrom: ramDateFrom,
} = program.opts<Record<string, string>>();

const articleType = articleTypeObjecter.unknownThrowCreate(rawArticleType);

const interval = dateYYYYMMDDIntervalObjecter.throwCreate({
	from: new Date(ramDateFrom!),
	to: new Date(ramDateTo!),
});

const mission = await createFetchPubmedArticleReferenceMissionUsecase.execute({
	articleType,
	interval,
});

const implementedScienceDatabaseRepository = scienceDatabaseRepository.use;

const startSearchResultMissionUsecase = new FetchPubmedArticleReferencesUsecase({
	scienceDatabaseRepository: {
		...implementedScienceDatabaseRepository,
		async *fetchPubmedArticleReferences(...args) {
			for await (const result of implementedScienceDatabaseRepository.fetchPubmedArticleReferences(...args)) {
				console.log(
					`Date: ${result.date.value.toISOString()}`,
					`Page: ${result.page.value}`,
				);

				yield result;
			}
		},
	},
});

const result = await startSearchResultMissionUsecase.execute({ mission });

logger(result);

if (result instanceof Error) {
	throw result;
}

