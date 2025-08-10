import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { FetchArticleReferenceMission } from "@business/domains/entities/fetchArticleReferenceMission";
import { PubmedFetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission/pubmed";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";
import { match } from "ts-pattern";
import { uuidv7 } from "uuidv7";

fetchArticleReferenceMissionRepository.default = {
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		await match(simpleEntity)
			.with(
				{ kind: "pubmedFetchArticleReferenceMissionEntity" },
				({
					kind: _kind,
					currentStep,
					interval,
					...simpleEntity
				}) => prismaClient
					.pubmedFetchArticleReferenceMission
					.upsert({
						where: {
							id: simpleEntity.id,
						},
						create: {
							...simpleEntity,
							currentStepDate: currentStep.date,
							currentStepPage: currentStep.page,
							intervalFrom: interval.from,
							intervalTo: interval.to,
						},
						update: {
							...simpleEntity,
							currentStepDate: currentStep.date,
							currentStepPage: currentStep.page,
							intervalFrom: interval.from,
							intervalTo: interval.to,
						},
					}),
			)
			.exhaustive();

		return entity;
	},
	generateId() {
		return FetchArticleReferenceMission.idObjecter.unsafeCreate(uuidv7());
	},
	findOnePubmedMission(id) {
		return prismaClient
			.pubmedFetchArticleReferenceMission
			.findUnique({
				where: {
					id: id.value,
				},
			})
			.then(
				(prismaEntity) => prismaEntity
					? EntityHandler.unsafeMapper(
						PubmedFetchArticleReferenceMissionEntity,
						{
							...prismaEntity,
							kind: "pubmedFetchArticleReferenceMissionEntity",
							interval: {
								from: prismaEntity.intervalFrom,
								to: prismaEntity.intervalTo,
							},
							currentStep: {
								date: prismaEntity.currentStepDate,
								page: prismaEntity.currentStepPage,
							},
						},
					)
					: null,
			);
	},
};
