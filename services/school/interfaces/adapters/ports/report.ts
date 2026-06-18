import { ReportPort } from "@applications/ports/report";
import { C, P, unwrap } from "@duplojs/utils";
import { HarborAPI } from "../../providers/harbor";

export const reportPort = ReportPort.createImplementation({
	async save(entity) {
		await P.match(entity.answerId)
			.with(
				null,
				() => HarborAPI.createPostUserWarning({
					makeUserBan: C.equal(entity.level, "ban"),
					reason: unwrap(entity.reason),
					userId: unwrap(entity.userId),
					postId: unwrap(entity.postId),
				}),
			)
			.otherwise(
				(answerId) => HarborAPI.createAnswerUserWarning({
					makeUserBan: C.equal(entity.level, "ban"),
					reason: unwrap(entity.reason),
					userId: unwrap(entity.userId),
					postId: unwrap(entity.postId),
					answerId: unwrap(answerId),
				}),
			);

		return entity;
	},
});
