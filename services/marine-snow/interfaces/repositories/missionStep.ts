
import { type MissionStep, missionStepRepository } from "@business/applications/repositories/missionStep";
import { SearchResultPubMedMissionStepEntity } from "@business/domains/entities/mission/searchResult/pubMedStep";
import { SendSearchResultMissionStepEntity } from "@business/domains/entities/mission/sendSearchResult/step";
import { prismaClient } from "@interfaces/providers/prisma";
import { match, P } from "ts-pattern";

missionStepRepository.default = {
	async save(entity) {
		await match({ entity: entity as MissionStep })
			.with(
				{ entity: P.instanceOf(SearchResultPubMedMissionStepEntity) },
				({ entity }) => {
					const simpleEntity = entity.toSimpleObject();

					return prismaClient.searchResultPubMedMissionStep.upsert({
						where: {
							missionId: simpleEntity.missionId,
						},
						create: simpleEntity,
						update: simpleEntity,
					});
				},
			)
			.with(
				{ entity: P.instanceOf(SendSearchResultMissionStepEntity) },
				({ entity }) => {
					const simpleEntity = entity.toSimpleObject();

					return prismaClient.sendSearchResultMissionStep.upsert({
						where: {
							missionId: simpleEntity.missionId,
						},
						create: simpleEntity,
						update: simpleEntity,
					});
				},
			)
			.exhaustive();

		return entity;
	},
};
