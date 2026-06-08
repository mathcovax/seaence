import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { mustBeOwnerDocumentFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentFolder";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/remove-document-folder")
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.handler(
		ResponseContract.noContent("documentFolder.removed"),
		({ ownerDocumentFolder }, { response }) => useCases
			.ownerRemoveDocumentFolderUseCase({
				ownerDocumentFolder,
			})
			.then(
				() => response("documentFolder.removed"),
			),
	);
