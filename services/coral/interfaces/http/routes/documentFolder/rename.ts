import { documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { userRenameDocumentFolderUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/rename-document-folder")
	.extract({
		body: zod.object({
			newDocumentFolderName: documentFolderNameObjecter.toZodSchema(),
		}),
	})
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.handler(
		async(pickup) => {
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);
			const { newDocumentFolderName } = pickup("body");

			await userRenameDocumentFolderUsecase.execute({
				userDocumentFolder,
				newDocumentFolderName,
			});

			return new OkHttpResponse("documentFolder.renamed");
		},
		makeResponseContract(OkHttpResponse, "documentFolder.renamed"),
	);
