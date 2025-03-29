import { searchResultMissionStepRepository } from "@business/applications/repositories/searchResultMissionStep";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/step/pubMed";
import { prismaClient } from "@interfaces/providers/prisma";

searchResultMissionStepRepository.default = {
	async save(entity) {
		if (entity instanceof SearchResultPubMedMissionStepEntity) {
			const simpleEntity = entity.toSimpleObject();

			await prismaClient.searchResultPubMedMissionStep.upsert({
				where: {
					missionId: simpleEntity.missionId,
				},
				create: simpleEntity,
				update: simpleEntity,
			});
		} else {
			throw new Error(`Unsupport search result mission step: ${entity.constructor.name}`);
		}

		return entity;
	},
};
