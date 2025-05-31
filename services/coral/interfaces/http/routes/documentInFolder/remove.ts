import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";
import { IWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { removeDocumentInFolderUsecase } from "@interfaces/usecase";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/remove-document-in-folder")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantDocumentInFolderExistById,
		(pickup) => ({
			documentFolderId: pickup("documentFolder").id,
			nodeSameRawDocumentId: pickup("body").nodeSameRawDocumentId,
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
