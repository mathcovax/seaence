import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { ResumeSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/resumeSearchResultMission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { findPubMedSearchResultMissionUsecase } from "@interfaces/usecase";
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

const implementedScienceDatabaseRepository = scienceDatabaseRepository.use;

const resumeSearchResultMissionUsecase = new ResumeSearchResultMissionUsecase({
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

const result = await resumeSearchResultMissionUsecase.execute({ mission });

console.log(result);
