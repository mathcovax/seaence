import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { mustBeOwnerDocumentInFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentInFolder";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/rename-document-in-folder")
	.extract({
		body: {
			newDocumentInFolderName: DocumentInFolder.Name.toExtractParser(),
		},
	})
	.exec(
		mustBeOwnerDocumentInFolderProcess,
		{ imports: ["ownerDocumentInFolder"] },
	)
	.handler(
		ResponseContract.noContent("documentInFolder.renamed"),
		({ newDocumentInFolderName, ownerDocumentInFolder }, { response }) => useCases
			.ownerRenameDocumentInFolderUseCase({
				ownerDocumentInFolder,
				newDocumentInFolderName,
			})
			.then(
				() => response("documentInFolder.renamed"),
			),
	);
