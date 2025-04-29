import { articleTypeObjecter } from "@business/domains/common/articleType";
import { providerObjecter } from "@business/domains/common/provider";
import { program } from "commander";
import { match } from "ts-pattern";
import { createPubMedSearchResultMissionUsecase, startSearchResultMissionUsecase } from "@interfaces/usecase";
import { dateYYYYMMDDIntervalObjecter } from "@vendors/clean";

program
	.requiredOption("-p, --provider <char>")
	.requiredOption("-a, --articleType <char>")
	.requiredOption("-t, --dateTo <char>")
	.requiredOption("-f, --dateFrom <char>");

program.parse();

const { provider: rawProvider } = program.opts<Record<string, string>>();

const provider = providerObjecter.unknownUnsafeCreate(rawProvider);

await match(provider)
	.with(
		{ value: "pubmed" },
		async() => {
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

			const mission = await createPubMedSearchResultMissionUsecase.execute({
				articleType,
				interval,
			});

			const result = await startSearchResultMissionUsecase.execute({ mission });

			console.log(result);
		},
	)
	.exhaustive();
