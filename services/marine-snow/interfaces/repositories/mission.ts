import { missionRepository, type Mission } from "@business/applications/repositories/mission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { PubMedSearchResultMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { prismaClient } from "@interfaces/providers/prisma";
import { match, P } from "ts-pattern";
import { uuidv7 } from "uuidv7";

missionRepository.default = {
	async save(entity) {
		await match({ entity: entity as Mission })
			.with(
				{ entity: P.instanceOf(PubMedSearchResultMissionEntity) },
				({ entity }) => {
					const { interval, ...restSimpleEntity } = entity.toSimpleObject();

					return prismaClient.searchResultPubMedMission.upsert({
						where: {
							id: restSimpleEntity.id,
						},
						create: {
							...restSimpleEntity,
							searchDateFrom: interval.from,
							searchDateTo: interval.to,
						},
						update: {
							...restSimpleEntity,
							searchDateFrom: interval.from,
							searchDateTo: interval.to,
						},
					});
				},
			)
			.with(
				{ entity: P.instanceOf(SendSearchResultMissionEntity) },
				async({ entity }) => {
					const simpleEntity = entity.toSimpleObject();

					await prismaClient.sendSearchResultMission.upsert({
						where: {
							id: simpleEntity.id,
						},
						create: simpleEntity,
						update: simpleEntity,
					});
				},
			)
			.exhaustive();

		return entity;
	},

	generateMissionId() {
		return missionIdObjecter.unsafeCreate(uuidv7());
	},
};
