import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";

const minimalDecrement = 0;

searchResultRepository.default = {
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		await prismaClient.searchResult.upsert({
			where: {
				id: {
					reference: simpleEntity.reference,
					provider: simpleEntity.provider,
				},
			},
			create: simpleEntity,
			update: simpleEntity,
		});

		return entity;
	},
	async delete(entity) {
		await prismaClient.searchResult.delete({
			where: {
				id: {
					provider: entity.provider.value,
					reference: entity.provider.value,
				},
			},
		});
	},
	async *selectSearchResultToSendThem(quantity, quantityPerPage) {
		for (
			let decrementQuantity = quantity.value;
			decrementQuantity > minimalDecrement;
			decrementQuantity -= quantityPerPage.value
		) {
			const prismaSearchResults = await prismaClient.searchResult.updateManyAndReturn({
				where: {
					status: "find",
				},
				data: {
					status: "selectedToBeSent",
				},
				limit: decrementQuantity > quantityPerPage.value
					? quantityPerPage.value
					: decrementQuantity,
				select: {
					provider: true,
					reference: true,
					status: true,
				},
			});

			yield prismaSearchResults.map(
				(searchResult) => EntityHandler.unsafeMapper(
					SearchResultEntity,
					searchResult,
				),
			);
		}
	},
};
