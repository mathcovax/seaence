import { exportArticleReferenceMissionRepository } from "@business/applications/repositories/exportArticleReferenceMission";
import { ExportArticleReferenceMission } from "@business/domains/entities/exportArticleReferenceMission";
import { prismaClient } from "@interfaces/providers/prisma";
import { match } from "ts-pattern";
import { uuidv7 } from "uuidv7";

exportArticleReferenceMissionRepository.default = {
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		await match(simpleEntity)
			.with(
				{ kind: "exportOneArticleReferenceMissionEntity" },
				({ kind: _kind, ...simpleEntity }) => prismaClient
					.exportOneArticleReferenceMission
					.upsert({
						where: {
							id: simpleEntity.id,
						},
						create: simpleEntity,
						update: simpleEntity,
					}),
			)
			.with(
				{ kind: "exportManyArticleReferenceMissionEntity" },
				({ kind: _kind, ...simpleEntity }) => prismaClient
					.exportManyArticleReferenceMission
					.upsert({
						where: {
							id: simpleEntity.id,
						},
						create: simpleEntity,
						update: simpleEntity,
					}),
			)
			.exhaustive();

		return entity;
	},
	generateId() {
		return ExportArticleReferenceMission.idObjecter.unsafeCreate(uuidv7());
	},
};
