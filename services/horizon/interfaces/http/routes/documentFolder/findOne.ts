import { DocumentFolder } from "@business/entities/documentFolder";
import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-one-document-folder")
	.extract({
		body: {
			documentFolderId: zod.string(),
		},
	})
	.presetCheck(
		iWantDocumentFolderExist,
		(pickup) => ({
			userId: pickup("user").id,
			documentFolderId: pickup("documentFolderId"),
		}),
	)
	.handler(
		(pickup) => {
			const { documentFolder } = pickup(["documentFolder"]);

			return new OkHttpResponse("documentFolder.found", documentFolder);
		},
		makeResponseContract(OkHttpResponse, "documentFolder.found", DocumentFolder.index),
	);
