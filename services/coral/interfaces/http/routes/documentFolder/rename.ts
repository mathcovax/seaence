import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, E } from "@duplojs/utils";
import { mustBeOwnerDocumentFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentFolder";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/rename-document-folder")
	.extract({
		body: {
			newDocumentFolderName: DocumentFolder.Name.toExtractParser(),
		},
	})
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.handler(
		[
			ResponseContract.conflict("documentFolder.alreadyExists"),
			ResponseContract.noContent("documentFolder.renamed"),
		],
		({ newDocumentFolderName, ownerDocumentFolder }, { response }) => asyncPipe(
			useCases.ownerRenameDocumentFolderUseCase({
				ownerDocumentFolder,
				newDocumentFolderName,
			}),
			E.whenHasInformation(
				"document-folder-already-exist",
				() => response("documentFolder.alreadyExists"),
			),
			E.whenHasInformation(
				"success",
				() => response("documentFolder.renamed"),
			),
		),
	);
