import { documentIdObjecter, documentSummaryObjecter, documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { iDontWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { createDocumentInFolderUsecase } from "@interfaces/usecase";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/add-document-in-folder")
	.extract({
		body: zod.object({
			documentId: documentIdObjecter.toZodSchema(),
			documentTitle: documentTitleObjecter.toZodSchema(),
			documentSummary: documentSummaryObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iDontWantDocumentInFolderExistById,
		(pickup) => ({
			documentFolderId: pickup("documentFolder").id,
			documentId: pickup("body").documentId,
		}),
	)
	.handler(
		async(pickup) => {
			const {
				documentFolder,
				body: { documentId, documentTitle, documentSummary },
			} = pickup(["documentFolder", "body"]);

			await createDocumentInFolderUsecase.execute({
				documentFolder,
				document: {
					id: documentId,
					title: documentTitle,
					summary: documentSummary,
				},
			});
			return new OkHttpResponse("documentInFolder.added");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.added"),
	);
