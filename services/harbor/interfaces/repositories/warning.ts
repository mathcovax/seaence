import { userWarningRepository, type Warning } from "@business/applications/repositories/warning";
import { AnswerUserWarningEntity } from "@business/domains/entities/warning/answer";
import { userWarningIdObjecter } from "@business/domains/entities/warning/base";
import { PostUserWarningEntity } from "@business/domains/entities/warning/post";
import { type AnswerReference, type PostReference, prismaClient } from "@interfaces/providers/prisma";
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
			.with(
				{ entity: P.instanceOf(AnswerUserWarningEntity) },
				({ entity }) => {
					const simpleEntity = entity.toSimpleObject();

					const entityReference: AnswerReference = {
						type: simpleEntity.type,
						postId: simpleEntity.postId,
						answerId: simpleEntity.answerId,
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
