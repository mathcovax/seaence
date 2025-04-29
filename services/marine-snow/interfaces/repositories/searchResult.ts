import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { SearchResultEntity } from "@business/domains/entities/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";

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
			update: {
				...simpleEntity,
				selected: false,
			},
		});

		return entity;
	},
	findOneByProviderAndReference(provider, reference) {
		return prismaClient.searchResult
			.findFirst({
				where: {
					provider: provider.value,
					reference: reference.value,
				},
			})
			.then(
				(prismaSearchResult) => prismaSearchResult && EntityHandler.unsafeMapper(
					SearchResultEntity,
					prismaSearchResult,
				),
			);
	},
	async delete(entity) {
		await prismaClient.searchResult.delete({
			where: {
				id: {
					provider: entity.provider.value,
					reference: entity.reference.value,
				},
			},
		});
	},

};
