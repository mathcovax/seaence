import { warningRepository } from "@business/applications/repositories/warning";
import { HarborAPI } from "@interfaces/providers/harbor";
import { RepositoryError } from "@vendors/clean";

warningRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async createPostWarning(warning) {
		const { makeUserBan, reason, post } = warning;

		await HarborAPI.createPostUserWarning({
			makeUserBan: makeUserBan.value,
			reason: reason.value,
			userId: post.authorId.value,
			postId: post.id.value,
		});
	},
	async createAnswerWarning(warning) {
		const { makeUserBan, reason, answer } = warning;

		await HarborAPI.createAnswerUserWarning({
			makeUserBan: makeUserBan.value,
			reason: reason.value,
			userId: answer.authorId.value,
			answerId: answer.id.value,
			postId: answer.postId.value,
		});
	},
};
