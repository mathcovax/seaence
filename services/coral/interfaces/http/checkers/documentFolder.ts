import { type UserId } from "@business/domains/common/user";
import { type DocumentFolderEntity, type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type GetTypeInput } from "@duplojs/core";
import { findDocumentFolderByIdUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const inputDocumentFolderExist = createTypeInput<{
	documentFolderId: DocumentFolderId;
}>();

export const documentFolderExistChecker = createChecker("documentFolderExistCheck")
	.handler(
		async(input: GetTypeInput<typeof inputDocumentFolderExist>, dropper) => {
			const documentFolder = await match(input)
				.with(
					{ inputName: "documentFolderId" },
					({ value }) => findDocumentFolderByIdUsecase.execute({ documentFolderId: value }),
				)
				.exhaustive();

			if (!documentFolder) {
				return dropper("documentFolder.notfound", null);
			} else {
				return dropper("documentFolder.exist", documentFolder);
			}
		},
	);

export const iWantDocumentFolderExistById = createPresetChecker(
	documentFolderExistChecker,
	{
		result: "documentFolder.exist",
		catch: () => new NotFoundHttpResponse("documentFolder.notfound"),
		transformInput: inputDocumentFolderExist.documentFolderId,
		indexing: "documentFolder",
	},
);

interface InputUserIsProprietaryOfDocumentFolder {
	userId: UserId;
	documentFolder: DocumentFolderEntity;
}

export const userIsProprietaryOfDocumentFolder = createChecker("userIsProprietaryOfDocumentFolder")
	.handler(
		(input: InputUserIsProprietaryOfDocumentFolder, dropper) => {
			const { userId, documentFolder } = input;

			if (documentFolder.userId !== userId) {
				return dropper("documentFolder.notproprietary", null);
			}

			return dropper("documentFolder.proprietary", documentFolder);
		},
	);

export const IWantUserIsProprietaryOfDocumentFolder = createPresetChecker(
	userIsProprietaryOfDocumentFolder,
	{
		result: "documentFolder.proprietary",
		catch: () => new ForbiddenHttpResponse("documentFolder.notproprietary"),
		indexing: "documentFolder",
	},
);
