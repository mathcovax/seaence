import { DocumentFolder } from "@business/entities/documentFolder";
import { documentFolderConfig } from "@interfaces/configs/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/document-folder-page")
	.handler(
		async(pickup) => {
			const { user } = pickup(["user"]);

			const result = await CoralAPI.findManyDocumentFolderDetails({
				userId: user.id,
				partialDocumentFolderName: "",
			});

			return new OkHttpResponse(
				"documentFolderPage.found",
				{
					total: result.body.total,
					quantityPerPage: documentFolderConfig.findMany.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolderPage.found", DocumentFolder.page),
	);
