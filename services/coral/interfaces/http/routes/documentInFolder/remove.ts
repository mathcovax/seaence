import { mustBeUserDocumentInFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentInFolderExistProcess";
import { userRemoveDocumentInFolderUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/remove-document-in-folder")
	.execute(
		mustBeUserDocumentInFolderExistProcess,
		{ pickup: ["userDocumentInFolder"] },
	)
	.handler(
		async(pickup) => {
			const { userDocumentInFolder } = pickup(["userDocumentInFolder"]);

			await userRemoveDocumentInFolderUsecase.execute({
				userDocumentInFolder,
			});

			return new OkHttpResponse("documentInFolder.removed");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.removed"),
	);
