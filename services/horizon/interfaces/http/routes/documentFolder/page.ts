import { DocumentFolder } from "@business/entities/documentFolder";
import { asyncPipe } from "@duplojs/utils";
import { documentFolderConfig } from "@interfaces/configs/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/document-folder-page")
	.handler(
		async(pickup) => asyncPipe(
			pickup("user"),
			(user) => CoralProvider.findManyDocumentFolderDetails({
				userId: user.id,
				partialDocumentFolderName: "",
			}),
			(result) => new OkHttpResponse(
				"documentFolderPage.found",
				{
					total: result.body.total,
					quantityPerPage: documentFolderConfig.findMany.quantityPerPage,
				},
			),
		),
		makeResponseContract(OkHttpResponse, "documentFolderPage.found", DocumentFolder.page),
	);
