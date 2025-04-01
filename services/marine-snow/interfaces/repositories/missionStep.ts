
import { missionStepRepository } from "@business/applications/repositories/missionStep";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { prismaClient } from "@interfaces/providers/prisma";

missionStepRepository.default = {
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
