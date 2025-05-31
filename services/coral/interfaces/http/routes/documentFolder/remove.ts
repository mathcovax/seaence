import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { userRemoveDocumentFolderUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/remove-document-folder")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.handler(
		async(pickup) => {
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);

			await userRemoveDocumentFolderUsecase.execute({
				userDocumentFolder,
			});

			return new OkHttpResponse("documentFolder.removed");
		},
		makeResponseContract(OkHttpResponse, "documentFolder.removed"),
	);
