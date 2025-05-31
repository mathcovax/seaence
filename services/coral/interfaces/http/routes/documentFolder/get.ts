import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { endpointGetDocumentFolderRouteSchema } from "@interfaces/http/schemas/documentFolder";

useBuilder()
	.createRoute("POST", "/get-document-folder")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.handler(
		(pickup) => {
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);

			return new OkHttpResponse("documentFolder.found", userDocumentFolder.value.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "documentFolder.found", endpointGetDocumentFolderRouteSchema),
	);
