import { missionRepository, type Mission } from "@business/applications/repositories/mission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { SearchResultPubMedMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { prismaClient } from "@interfaces/providers/prisma";
import { match, P } from "ts-pattern";
import { uuidv7 } from "uuidv7";

missionRepository.default = {
	async save(entity) {
		await match({ entity: entity as Mission })
			.with(
				{ entity: P.instanceOf(SearchResultPubMedMissionEntity) },
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
					const { resultDetails, ...restSimpleEntity } = entity.toSimpleObject();

					await prismaClient.sendSearchResultMission.upsert({
						where: {
							id: restSimpleEntity.id,
						},
						create: restSimpleEntity,
						update: restSimpleEntity,
					});

					if (resultDetails) {
						await prismaClient.resultDetailsSendSearchResultMission.upsert({
							where: {
								missionId: restSimpleEntity.id,
							},
							create: {
								missionId: restSimpleEntity.id,
								...resultDetails,
							},
							update: resultDetails,
						});
					}
				},
			)
			.exhaustive();

		return entity;
	},

	generateMissionId() {
		return missionIdObjecter.unsafeCreate(uuidv7());
	},
};
