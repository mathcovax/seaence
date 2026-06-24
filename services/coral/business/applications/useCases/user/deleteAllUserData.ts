import { C } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { FavoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import type { UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
}

export const DeleteAllUserDataUseCase = C.createUseCase(
	{
		FavoriteEquationRepository,
		DocumentFolderRepository,
		DocumentInFolderRepository,
	},
	({
		favoriteEquationRepository,
		documentFolderRepository,
		documentInFolderRepository,
	}) => ({ userId }: Input) => Promise.all([
		favoriteEquationRepository.deleteAllByUserId(userId),
		documentInFolderRepository.deleteAllByUserId(userId),
		documentFolderRepository.deleteAllByUserId(userId),
	]),
);
