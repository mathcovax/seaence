import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { mustBeOwnerDocumentInFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentInFolder";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/remove-document-in-folder")
	.exec(
		mustBeOwnerDocumentInFolderProcess,
		{ imports: ["ownerDocumentInFolder"] },
	)
	.handler(
		ResponseContract.noContent("documentInFolder.removed"),
		({ ownerDocumentInFolder }, { response }) => useCases
			.ownerRemoveDocumentInFolderUseCase({
				ownerDocumentInFolder,
			})
			.then(
				() => response("documentInFolder.removed"),
			),
	);
