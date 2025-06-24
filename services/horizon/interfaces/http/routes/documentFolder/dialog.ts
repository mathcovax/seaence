import { DocumentFolder } from "@business/entities/documentFolder";
import { documentFolderConfig } from "@interfaces/configs/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("POST", "/document-folder-dialog")
	.handler(
		() => new OkHttpResponse(
			"documentFolderDialog.found",
			{
				quantityPerPage: documentFolderConfig.findManyInWhichDocumentExist.quantityPerPage,
			},
		),
		makeResponseContract(OkHttpResponse, "documentFolderDialog.found", DocumentFolder.dialog),
	);
