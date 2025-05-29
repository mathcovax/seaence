import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { removeDocumentFolderUsecase } from "@interfaces/usecase";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "remove-document-folder")
	.handler(
		async(pickup) => {
			const { documentFolder } = pickup(["documentFolder"]);

			await removeDocumentFolderUsecase.execute({
				documentFolder,
			});

			return new OkHttpResponse("documentFolder.removed");
		},
		makeResponseContract(OkHttpResponse, "documentFolder.removed"),
	);
