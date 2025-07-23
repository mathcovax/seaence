import { documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { mustBeUserDocumentInFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentInFolderExistProcess";
import { userRenameDocumentInFolderUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/rename-document-in-folder")
	.extract({
		body: zod.object({
			newDocumentInFolderName: documentInFolderNameObjecter.toZodSchema(),
		}),
	})
	.execute(
		mustBeUserDocumentInFolderExistProcess,
		{ pickup: ["userDocumentInFolder"] },
	)
	.handler(
		async(pickup) => {
			const { userDocumentInFolder } = pickup(["userDocumentInFolder"]);
			const { newDocumentInFolderName } = pickup("body");

			await userRenameDocumentInFolderUsecase.execute({
				userDocumentInFolder,
				newDocumentInFolderName,
			});

			return new OkHttpResponse("documentInFolder.renamed");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.renamed"),
	);
