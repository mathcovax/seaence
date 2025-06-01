import { warningRepository } from "@business/applications/repositories/warning";
import { warningIdObjecter } from "@business/domains/entities/warning";
import { prismaClient } from "@interfaces/providers/prisma";
import { uuidv7 } from "uuidv7";

warningRepository.default = {
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		await prismaClient.warning.upsert({
			where: {
				id: simpleEntity.id,
			},
			create: {
				id: simpleEntity.id,
				makeUserBan: simpleEntity.makeUserBan,
				reason: simpleEntity.reason,
				value: JSON.stringify(simpleEntity),
			},
			update: {
				makeUserBan: simpleEntity.makeUserBan,
				reason: simpleEntity.reason,
				value: JSON.stringify(simpleEntity),
			},
		});

		return entity;
	},
	generateWarningId() {
		return warningIdObjecter.unsafeCreate(uuidv7());
	},
};
