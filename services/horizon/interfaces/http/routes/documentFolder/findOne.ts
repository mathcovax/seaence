import { DocumentFolder } from "@business/entities/documentFolder";
import { D, O } from "@duplojs/utils";
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
		(pickup) => new OkHttpResponse(
			"documentFolder.found",
			// theDate translation
			O.transformProperty(
				pickup("documentFolder"),
				"createdAt",
				D.toISOString,
			),
		),
		makeResponseContract(OkHttpResponse, "documentFolder.found", DocumentFolder.index),
	);
