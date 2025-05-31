import { type DocumentFolderId } from "@business/domains/entities/documentFolder";
import { type NodeSameRawDocumentId } from "@business/domains/entities/documentInFolder";
import { type GetTypeInput } from "@duplojs/core";
import { findDocumentInFolderUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const inputDocumentInFolderExist = createTypeInput<{
	id: {
		documentFolderId: DocumentFolderId;
		nodeSameRawDocumentId: NodeSameRawDocumentId;
	};
}>();

export const documentInFolderExistChecker = createChecker("documentInFolderExistCheck")
	.handler(
		async(input: GetTypeInput<typeof inputDocumentInFolderExist>, dropper) => {
			const documentInFolder = await match(input)
				.with(
					{ inputName: "id" },
					({ value }) => findDocumentInFolderUsecase.execute({
						folderId: value.documentFolderId,
						nodeSameRawDocumentId: value.nodeSameRawDocumentId,
					}),
				)
				.exhaustive();

			if (!documentInFolder) {
				return dropper("documentInFolder.notfound", null);
			} else {
				return dropper("documentInFolder.exist", documentInFolder);
			}
		},
	);

export const IWantDocumentInFolderExistById = createPresetChecker(
	documentInFolderExistChecker,
	{
		result: "documentInFolder.exist",
		catch: () => new NotFoundHttpResponse("documentInFolder.notfound"),
		transformInput: inputDocumentInFolderExist.id,
		indexing: "documentInFolder",
	},
);

export const iDontWantDocumentInFolderExistById = createPresetChecker(
	documentInFolderExistChecker,
	{
		result: "documentInFolder.notfound",
		catch: () => new OkHttpResponse("documentInFolder.isAlreadyExist"),
		transformInput: inputDocumentInFolderExist.id,
	},
);
