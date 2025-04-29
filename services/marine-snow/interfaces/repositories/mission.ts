import { missionRepository, type Mission } from "@business/applications/repositories/mission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { PubMedSearchResultMissionEntity } from "@business/domains/entities/mission/searchResult/pubMed";
import { SendSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult";
import { SendOneSearchResultMissionEntity } from "@business/domains/entities/mission/sendSearchResult/one";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";
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
			.with(
				{ entity: P.instanceOf(SendOneSearchResultMissionEntity) },
				async({ entity }) => {
					const { searchResult, ...restSimpleEntity } = entity.toSimpleObject();

					await prismaClient.sendOneSearchResultMission.upsert({
						where: {
							id: restSimpleEntity.id,
						},
						create: {
							...restSimpleEntity,
							searchResultReference: searchResult.reference,
							searchResultProvider: searchResult.provider,
						},
						update: {
							...restSimpleEntity,
							searchResultReference: searchResult.reference,
							searchResultProvider: searchResult.provider,
						},
					});
				},
			)
			.exhaustive();

		return entity;
	},

	generateMissionId() {
		return missionIdObjecter.unsafeCreate(uuidv7());
	},

	async findPubMedSearchResultMission(id) {
		return prismaClient.searchResultPubMedMission
			.findFirst({
				where: {
					id: id.value,
				},
			})
			.then(
				(prismaMission) => prismaMission && EntityHandler.unsafeMapper(
					PubMedSearchResultMissionEntity,
					{
						id: prismaMission.id,
						articleType: prismaMission.articleType,
						interval: {
							from: prismaMission.searchDateFrom,
							to: prismaMission.searchDateTo,
						},
						status: prismaMission.status,
					},
				),
			);
	},
};
