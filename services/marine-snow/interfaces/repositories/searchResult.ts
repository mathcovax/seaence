import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";

searchResultRepository.default = {
	async save(searchResult) {
		const updatedValues = searchResult.getUpdatedValues();

		await prismaClient.searchResult.upsert({
			where: {
				url: searchResult.url.value,
			},
			create: {
				...searchResult.toJSON(),
			},
			update: {
				...updatedValues,
			},
		});

		return searchResult;
	},

	async importSearchResultFromProvider(searchResult) {
		await prismaClient.searchResult.upsert({
			where: {
				url: searchResult.url.value,
			},
			create: {
				...searchResult.toJSON(),
			},
			update: {},
		});
	},
};

