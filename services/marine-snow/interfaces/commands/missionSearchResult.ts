import { articleTypeObjecter } from "@business/domains/common/articleType";
import { providerObjecter } from "@business/domains/common/provider";
import { program } from "commander";
import { match } from "ts-pattern";
import { createPubMedSearchResultMissionUsecase } from "@interfaces/usecase";
import { dateYYYYMMDDIntervalObjecter } from "@vendors/clean";
import { StartSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/startSearchResultMission";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { logger } from "@vendors/backend-logger";

program
	.requiredOption("-p, --provider <char>")
	.requiredOption("-a, --articleType <char>")
	.requiredOption("-t, --dateTo <char>")
	.requiredOption("-f, --dateFrom <char>");

program.parse();

const { provider: rawProvider } = program.opts<Record<string, string>>();

const provider = providerObjecter.unknownUnsafeCreate(rawProvider);

const mission = await match(provider)
	.with(
		{ value: "pubmed" },
		() => {
			const {
				articleType: rawArticleType,
				dateTo: ramDateTo,
				dateFrom: ramDateFrom,
			} = program.opts<Record<string, string>>();

			const articleType = articleTypeObjecter.unknownThrowCreate(rawArticleType);
			const interval = dateYYYYMMDDIntervalObjecter.throwCreate({
				from: new Date(ramDateFrom),
				to: new Date(ramDateTo),
			});

			return createPubMedSearchResultMissionUsecase.execute({
				articleType,
				interval,
			});
		},
	)
	.exhaustive();

const implementedScienceDatabaseRepository = scienceDatabaseRepository.use;

const startSearchResultMissionUsecase = new StartSearchResultMissionUsecase({
	scienceDatabaseRepository: {
		...implementedScienceDatabaseRepository,
		async *startSearchResultMission(...args) {
			for await (const result of implementedScienceDatabaseRepository.startSearchResultMission(...args)) {
				if (!(result instanceof Error)) {
					console.log(
						`Date: ${result.currentStep.date.value.toISOString()}`,
						`Page: ${result.currentStep.page.value}`,
					);
				}
				yield result;
			}
		},
	},
});

const result = await startSearchResultMissionUsecase.execute({ mission });

logger(result);
