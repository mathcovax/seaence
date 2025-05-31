import { nodeSameRawDocumentIdObjecter, documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { iDontWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { createDocumentInFolderUsecase } from "@interfaces/usecase";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/add-document-in-folder")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			documentInFolderName: documentInFolderNameObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iDontWantDocumentInFolderExistById,
		(pickup) => ({
			documentFolderId: pickup("documentFolder").id,
			nodeSameRawDocumentId: pickup("body").nodeSameRawDocumentId,
		}),
	)
	.handler(
		async(pickup) => {
			const {
				documentFolder,
				body: { nodeSameRawDocumentId, documentInFolderName },
			} = pickup(["documentFolder", "body"]);

			await createDocumentInFolderUsecase.execute({
				documentFolder,
				document: {
					nodeSameRawDocumentId,
					name: documentInFolderName,
				},
			});
			return new OkHttpResponse("documentInFolder.added");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.added"),
	);
