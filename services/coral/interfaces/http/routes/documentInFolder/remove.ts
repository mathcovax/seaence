import { documentIdObjecter } from "@business/domains/entities/documentInFolder";
import { IWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { removeDocumentInFolderUsecase } from "@interfaces/usecase";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/remove-document-in-folder")
	.extract({
		body: zod.object({
			documentId: documentIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantDocumentInFolderExistById,
		(pickup) => ({
			documentFolderId: pickup("documentFolder").id,
			documentId: pickup("body").documentId,
		}),
	)
	.handler(
		async(pickup) => {
			const { documentInFolder } = pickup(["documentInFolder"]);

			await removeDocumentInFolderUsecase.execute({
				documentInFolder,
			});
			return new OkHttpResponse("documentInFolder.removed");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.removed"),
	);
