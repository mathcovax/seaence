import { CoralAPI } from "@interfaces/providers/coral";

interface InputDocumentFolderExistCheck {
	userId: string;
	documentFolderId: string;
}

export const documentFolderExistCheck = createChecker("documentFolderExist")
	.handler(
		async(input: InputDocumentFolderExistCheck, output) => {
			const response = await CoralAPI.findOneDocumentFolder(input);

			if (response.information === "documentFolder.found") {
				return output("documentFolder.exist", response.body);
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
