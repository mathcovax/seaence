import { DocumentInFolder } from "@business/entities/documentInFolder";
import { documentInFolderConfig } from "@interfaces/configs/documentInFolder";
import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";

useMustBeConnectedBuilder()
	.createRoute("POST", "/document-in-folder-page")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
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
		(pickup) => {
			const { documentFolder } = pickup(["documentFolder"]);

			return new OkHttpResponse(
				"documentInFolderPage.found",
				{
					total: documentFolder.numberOfDocument,
					quantityPerPage: documentInFolderConfig.findMany.quantityPerPage,
					maxInFolder: documentInFolderConfig.maxInFolder,
					documentFolderName: documentFolder.name,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentInFolderPage.found", DocumentInFolder.page),
	);
