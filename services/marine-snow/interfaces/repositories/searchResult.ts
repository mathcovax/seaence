import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { searchResultEntityHandler } from "@business/domains/entities/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";

searchResultRepository.default = {
	async save(searchResult) {
		const { updatedValues } = searchResultEntityHandler.informations.get(searchResult)!;

		await prismaClient.searchResult.upsert({
			where: {
				url: searchResult.url.value,
			},
			create: {
				...searchResultEntityHandler.toJSON(searchResult),
			},
			update: {
				...updatedValues,
			},
		});

		searchResultEntityHandler.clearInformation(searchResult);

		return searchResult;
	},

	async importSearchResultFromProvider(searchResult) {
		await prismaClient.searchResult.upsert({
			where: {
				url: searchResult.url.value,
			},
			create: {
				...searchResultEntityHandler.toJSON(searchResult),
			},
			update: {},
		});
	},
};

