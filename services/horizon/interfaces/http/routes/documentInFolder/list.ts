import { DocumentInFolder } from "@business/entities/documentInFolder";
import { documentInFolderConfig } from "@interfaces/configs/documentInFolder";
import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/document-in-folder-list")
	.extract({
		body: zod.object({
			page: zod
				.number()
				.min(documentInFolderConfig.findMany.pageOffset),
			documentFolderId: zod.string(),
			partialDocumentInFolderName: zod.string(),
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
			const { user, documentFolder, body: { page, partialDocumentInFolderName } } = pickup(["body", "documentFolder", "user"]);

			const { body: list } = await CoralAPI.findManyDocumentInFolder({
				userId: user.id,
				documentFolderId: documentFolder.id,
				partialDocumentInFolderName,
				page: page - documentInFolderConfig.findMany.pageOffset,
				quantityPerPage: documentInFolderConfig.findMany.quantityPerPage,
			});

			const { body: { total } } = await CoralAPI.getfindManyDocumentInFolderCount({
				userId: user.id,
				documentFolderId: documentFolder.id,
				partialDocumentInFolderName,
			});

			return new OkHttpResponse(
				"documentInFolderList.found",
				{
					total,
					list,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentInFolderList.found", DocumentInFolder.list),
	);
