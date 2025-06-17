import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/remove-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
			nodeSameRawDocumentId: zod.string(),
		}),
	})
	.presetCheck(
		iWantDocumentFolderExist,
		(pickup) => ({
			userId: pickup("user").id,
			documentFolderId: pickup("body").documentFolderId,
		}),
	)
	.handler(
		async(pickup) => {
			const { documentFolder, user, body: { nodeSameRawDocumentId } } = pickup(["documentFolder", "user", "body"]);

			await CoralAPI.removeDocumentInFolder({
				userId: user.id,
				documentFolderId: documentFolder.id,
				nodeSameRawDocumentId,
			});

			return new NoContentHttpResponse("documentInFolder.removed");
		},
		makeResponseContract(NoContentHttpResponse, "documentInFolder.removed"),
	);
