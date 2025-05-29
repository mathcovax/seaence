
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointGetDocumentFolderRoute } from "@interfaces/http/schemas/documentFolder";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "get-document-folder")
	.handler(
		(pickup) => {
			const { documentFolder } = pickup(["documentFolder"]);

			return new OkHttpResponse("documentFolder.found", documentFolder.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "documentFolder.found", endpointGetDocumentFolderRoute),
	);
