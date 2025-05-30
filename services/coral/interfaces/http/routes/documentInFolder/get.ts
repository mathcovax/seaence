import { documentIdObjecter } from "@business/domains/entities/documentInFolder";
import { IWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointGetDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/get-document-in-folder")
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
		(pickup) => {
			const { documentInFolder } = pickup(["documentInFolder"]);

			return new OkHttpResponse("documentInFolder.found", documentInFolder.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.found", endpointGetDocumentInFolderRouteSchema),
	);
