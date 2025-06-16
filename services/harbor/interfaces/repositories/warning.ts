import { userWarningRepository, type Warning } from "@business/applications/repositories/warning";
import { userWarningIdObjecter } from "@business/domains/entities/warning/base";
import { PostUserWarningEntity } from "@business/domains/entities/warning/post";
import { type PostReference, prismaClient } from "@interfaces/providers/prisma";
import { match, P } from "ts-pattern";
import { uuidv7 } from "uuidv7";

userWarningRepository.default = {
	async save(entity) {
		await match({ entity: entity as Warning })
			.with(
				{ entity: P.instanceOf(PostUserWarningEntity) },
				({ entity }) => {
					const simpleEntity = entity.toSimpleObject();

					const entityReference: PostReference = {
						type: simpleEntity.type,
						postId: simpleEntity.postId,
					};

					return prismaClient.warning.upsert({
						where: {
							id: simpleEntity.id,
						},
						create: {
							id: simpleEntity.id,
							makeUserBan: simpleEntity.makeUserBan,
							reason: simpleEntity.reason,
							userId: simpleEntity.userId,
							reference: entityReference,
						},
						update: {
							makeUserBan: simpleEntity.makeUserBan,
							reason: simpleEntity.reason,
							userId: simpleEntity.userId,
							reference: entityReference,
						},
					});
				},
			)
			.exhaustive();

		return entity;
	},
	generateUserWarningId() {
		return userWarningIdObjecter.unsafeCreate(uuidv7());
	},
};
