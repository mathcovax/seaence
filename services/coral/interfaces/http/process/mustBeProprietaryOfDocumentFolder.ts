import { userIdObjecter } from "@business/domains/common/user";
import { iWantDocumentFolderExistById, IWantUserIsProprietaryOfDocumentFolder } from "../checkers/documentFolder";
import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";

const mustBeProprietaryOfDocumentFolder = createProcess("mustBeProprietaryOdDocumentFolder")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			documentFolderId: documentFolderIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantDocumentFolderExistById,
		(pickup) => pickup("body").documentFolderId,
	)
	.presetCheck(
		IWantUserIsProprietaryOfDocumentFolder,
		(pickup) => ({
			userId: pickup("body").userId,
			documentFolder: pickup("documentFolder"),
		}),
	)
	.exportation(["documentFolder"]);

export function mustBeProprietaryOfDocumentFolderRouteBuilder() {
	return useBuilder()
		.preflight(
			mustBeProprietaryOfDocumentFolder,
			{
				pickup: ["documentFolder"],
			},
		);
}
