import { missionRepository } from "@business/applications/repositories/mission";
import { missionIdObjecter } from "@business/domains/entities/mission";
import { SearchResultMissionEntity } from "@business/domains/entities/mission/searchResultMission";
import { prismaClient } from "@interfaces/providers/prisma";
import { queue } from "@interfaces/providers/queue";
import { WorkerCluster } from "@interfaces/worker";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

missionRepository.default = {
	async save(mission) {
		const updatedValue = mission.getUpdatedValues();

		if (updatedValue.status === "inProgress") {
			return mission;
		}

		if (mission instanceof SearchResultMissionEntity) {
			const { id, ...missionRest } = mission.toSimpleObject();

			await prismaClient.searchResultMission.upsert({
				where: {
					id,
				},
				create: {
					id,
					...missionRest,
				},
				update: {
					...updatedValue,
				},
			});

			return mission;
		}

		throw new Error(`Unsupported misison : ${mission.constructor.name}`);
	},

	generateMissionId() {
		return missionIdObjecter.unsafeCreate(uuidv7());
	},

	async findSearchResultMissionBetweenDate(params) {
		const inCacheMission = [
			...queue,
			...WorkerCluster
				.workers
				.map((workersCluster) => workersCluster.currentMission),
		]
			.filter(
				(mission): mission is SearchResultMissionEntity => (
					mission instanceof SearchResultMissionEntity
					&& mission.provider.value === params.provider.value
					&& mission.articleType.value === params.articleType.value
					&& mission.publishDateSearched.value.getTime() > params.fromDate.getTime()
					&& mission.publishDateSearched.value.getTime() < params.toDate.getTime()
				),
			);

		const completeMission = await prismaClient.searchResultMission.findMany({
			where: {
				provider: params.provider.value,
				articleType: params.articleType.value,
				publishDateSearched: {
					gt: params.fromDate,
					lt: params.toDate,
				},
			},
		})
			.then(
				(missionsPrisma) => missionsPrisma.map(
					(missionaPrisma) => EntityHandler.unsafeMapper(
						SearchResultMissionEntity,
						{
							name: "searchResult",
							...missionaPrisma,
						},
					),
				),
			);

		return [
			...inCacheMission,
			...completeMission,
		];
	},
};
