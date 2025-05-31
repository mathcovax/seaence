import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";
import { IWantDocumentInFolderExistById } from "@interfaces/http/checkers/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointGetDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/get-document-in-folder")
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
		(pickup) => {
			const { documentInFolder } = pickup(["documentInFolder"]);

			return new OkHttpResponse("documentInFolder.found", documentInFolder.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.found", endpointGetDocumentInFolderRouteSchema),
	);
