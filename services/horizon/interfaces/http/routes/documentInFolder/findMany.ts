import { DocumentInFolder } from "@business/entities/documentInFolder";
import { documentInFolderConfig } from "@interfaces/configs/documentInFolder";
import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { AbysAPI } from "@interfaces/providers/abys";
import { CoralAPI } from "@interfaces/providers/coral";
import { createBakedDocumentId } from "@interfaces/utils/createBakedDocumentId";

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

			const response = await AbysAPI.findManyBakedDocumentTitle(
				list.map(({ nodeSameRawDocumentId }) => createBakedDocumentId({
					nodeSameRawDocumentId,
					bakedDocumentLanguage: user.language,
				})),
			);

			const formatedList = response.information === "bakedDocuments.notfound"
				? list
				: list.map(
					(documentInFolder): typeof DocumentInFolder.detailedList["_output"][number] => ({
						...documentInFolder,
						bakedDocumentTitle: response.body[
							createBakedDocumentId({
								nodeSameRawDocumentId: documentInFolder.nodeSameRawDocumentId,
								bakedDocumentLanguage: user.language,
							})
						],
					}),
				);

			return new OkHttpResponse(
				"documentInFolderList.found",
				formatedList,
			);
		},
		makeResponseContract(OkHttpResponse, "documentInFolderList.found", DocumentInFolder.detailedList),
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
