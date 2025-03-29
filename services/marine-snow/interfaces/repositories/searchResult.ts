import { searchResultRepository } from "@business/applications/repositories/searchResult";
import { prismaClient } from "@interfaces/providers/prisma";

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
			update: entity.getUpdatedValues(),
		});

		return entity;
	},
};
