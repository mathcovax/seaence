import { mustBeUserDocumentInFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentInFolderExistProcess";
import { endpointGetDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";

useBuilder()
	.createRoute("POST", "/get-document-in-folder")
	.execute(
		mustBeUserDocumentInFolderExistProcess,
		{ pickup: ["userDocumentInFolder"] },
	)
	.handler(
		(pickup) => {
			const { userDocumentInFolder } = pickup(["userDocumentInFolder"]);

			return new OkHttpResponse("documentInFolder.found", userDocumentInFolder.value.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.found", endpointGetDocumentInFolderRouteSchema),
	);
