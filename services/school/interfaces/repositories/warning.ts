import { warningRepository } from "@business/applications/repositories/warning";
import { HarborAPI } from "@interfaces/providers/harbor";
import { RepositoryError } from "@vendors/clean";

warningRepository.default = {
	save() {
		throw new RepositoryError("unsupported-method");
	},
	async createWarning(warning) {
		const { makeUserBan, reason, postId, contentCreatorId } = warning;

		await HarborAPI.createPostUserWarning({
			makeUserBan: makeUserBan.value,
			reason: reason.value,
			userId: contentCreatorId.value,
			postId: postId.value,
		});
	},
};
