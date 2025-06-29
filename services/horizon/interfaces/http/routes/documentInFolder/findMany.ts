import { DocumentInFolder } from "@business/entities/documentInFolder";
import { documentInFolderConfig } from "@interfaces/configs/documentInFolder";
import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-in-folder")
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

			return new OkHttpResponse(
				"documentInFolderList.found",
				list,
			);
		},
		makeResponseContract(OkHttpResponse, "documentInFolderList.found", DocumentInFolder.list),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-in-folder-details")
	.extract({
		body: zod.object({
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
			const { user, documentFolder, body: { partialDocumentInFolderName } } = pickup(["body", "documentFolder", "user"]);

			const { body: { total } } = await CoralAPI.findManyDocumentInFolderDetails({
				userId: user.id,
				documentFolderId: documentFolder.id,
				partialDocumentInFolderName,
			});

			return new OkHttpResponse(
				"documentInFolderList.foundDetails",
				{
					total,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentInFolderList.foundDetails", DocumentInFolder.details),
	);
