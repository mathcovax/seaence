import { createUsecaseHandler } from "@vendors/clean";
import { searchResultRepository } from "../repositories/searchResult";
import { searchResultEntityHandler } from "@business/domains/entities/searchResult";

interface Input {

}

export const findSearchResultForOneDayUsecase = createUsecaseHandler(
	"findSearchResultForOneDay",
	{
		searchResultRepository,
	},
	(dependencies, input: Input) => {
		const searchResult = searchResultEntityHandler.new({});

		return dependencies.searchResultRepository.save(searchResult);
	},
);
