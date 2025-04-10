import { articleTypeObjecter } from "@business/domains/common/articleType";
import { dateIntervalObjecter } from "@business/domains/common/dateInterval";
import { providerObjecter } from "@business/domains/common/provider";
import { pubMedProviderObjecter } from "@business/domains/entities/mission/searchResult/pubMed";
import { program } from "commander";
import { match } from "ts-pattern";
import { createSearchResultPubMedMissionUsecase, startSearchResultMissionUsecase } from "@interfaces/usecase";

program
	.requiredOption("-p, --provider <char>")
	.requiredOption("-a, --articleType <char>")
	.requiredOption("-t, --dateTo <char>")
	.requiredOption("-f, --dateFrom <char>");

program.parse();

const { provider: rawProvider } = program.opts<Record<string, string>>();

const provider = providerObjecter.unknownThrowCreate(rawProvider);

await match(provider)
	.with(
		{ value: "pubmed" },
		async(provider) => {
			const {
				articleType: rawArticleType,
				dateTo: ramDateTo,
				dateFrom: ramDateFrom,
			} = program.opts<Record<string, string>>();

			const pubMedProvider = pubMedProviderObjecter.throwCreate(provider.value);
			const articleType = articleTypeObjecter.unknownThrowCreate(rawArticleType);
			const interval = dateIntervalObjecter.throwCreate({
				from: new Date(ramDateFrom),
				to: new Date(ramDateTo),
			});

			const mission = await createSearchResultPubMedMissionUsecase.execute({
				provider: pubMedProvider,
				articleType,
				interval,
			});

			const result = await startSearchResultMissionUsecase.execute({ mission });
			console.log(result);
		},
	)
	.with(
		{ value: "pedro" },
		(provider) => {
			throw new Error("Unsupported provider.");
		},
	)
	.with(
		{ value: "sciencedirect" },
		(provider) => {
			throw new Error("Unsupported provider.");
		},
	)
	.exhaustive();
