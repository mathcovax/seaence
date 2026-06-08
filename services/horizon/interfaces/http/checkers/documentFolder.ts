import { CoralProvider } from "@interfaces/providers/coral";

interface InputDocumentFolderExistCheck {
	userId: string;
	documentFolderId: string;
}

export const documentFolderExistCheck = createChecker("documentFolderExist")
	.handler(
		async(input: InputDocumentFolderExistCheck, output) => {
			const result = await CoralProvider.findOneDocumentFolder(input);

			if (result.information === "documentFolder.found") {
				return output("documentFolder.exist", result.body);
			} else {
				return output("documentFolder.notfound", null);
			}
		},
	);

export const iWantDocumentFolderExist = createPresetChecker(
	documentFolderExistCheck,
	{
		result: "documentFolder.exist",
		catch: () => new NotFoundHttpResponse("documentFolder.notfound"),
		indexing: "documentFolder",
	},
	makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
);
