import { missionRepository } from "@business/applications/repositories/mission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { prismaClient } from "@interfaces/providers/prisma";
import { uuidv7 } from "uuidv7";

missionRepository.default = {
	async save(entity) {
		if (entity instanceof SearchResultPubMedMissionEntity) {
			const { interval, ...restSimpleEntity } = entity.toSimpleObject();
			const { interval: updatedInterval, ...restUpdatedEntity } = entity.getUpdatedValues();

			await prismaClient.searchResultPubMedMission.upsert({
				where: {
					id: restSimpleEntity.id,
				},
				create: {
					...restSimpleEntity,
					searchDateFrom: interval.from,
					searchDateTo: interval.to,
				},
				update: {
					...restUpdatedEntity,
					searchDateFrom: updatedInterval?.from,
					searchDateTo: updatedInterval?.to,
				},
			});
		} else {
			throw new Error(`Unsupport mission: ${entity.constructor.name}`);
		}

		return entity;
	},

	generateMissionId() {
		return missionIdObjecter.unsafeCreate(uuidv7());
	},
};
