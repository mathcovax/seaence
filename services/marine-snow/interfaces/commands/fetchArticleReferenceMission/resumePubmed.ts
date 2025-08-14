import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { FetchPubmedArticleReferencesUsecase } from "@business/applications/usecases/fetchArticleReferenceMission/pubmed";
import { FetchArticleReferenceMission } from "@business/domains/entities/fetchArticleReferenceMission";
import { findOneFetchPubmedArticleReferenceMissionUsecase, recoveryFetchArticleReferenceMissionUsecase } from "@interfaces/usecase";
import { logger } from "@vendors/backend-logger";
import { TechnicalError } from "@vendors/clean/error";
import { program } from "commander";

program
	.requiredOption("-i, --id <char>");

program.parse();

const { id: rawId } = program.opts<Record<string, string>>();

const id = FetchArticleReferenceMission.idObjecter.unknownThrowCreate(rawId);

const mission = await findOneFetchPubmedArticleReferenceMissionUsecase.execute({ id });

if (!mission) {
	throw new TechnicalError("not found pubMed search result mission", { id });
}

const recoveredMission = await recoveryFetchArticleReferenceMissionUsecase
	.execute({ mission });

if (recoveredMission instanceof Error) {
	logger(recoveredMission);
	throw recoveredMission;
}

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

const result = await startSearchResultMissionUsecase.execute({ mission: recoveredMission });

logger(result);

if (result instanceof Error) {
	throw result;
}
