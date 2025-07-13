import { documentFolderRepository } from "@business/applications/repositories/documentFolder";
import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { favoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import { type UserId } from "@business/domains/common/user";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	userId: UserId;
}

export class DeleteAllUserDataUsecase extends UsecaseHandler.create({
	documentFolderRepository,
	documentInFolderRepository,
	favoriteEquationRepository,
}) {
	public execute({ userId }: Input) {
		return Promise.all([
			this.documentFolderRepository.deleteAllByUserId(userId),
			this.documentInFolderRepository.deleteAllByUserId(userId),
			this.favoriteEquationRepository.deleteAllByUserId(userId),
		]);
	}
}
