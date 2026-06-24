import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C } from "@duplojs/utils";
import { mustBeOwnerDocumentFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentFolder";

useRouteBuilder("POST", "/find-one-document-folder")
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.handler(
		ResponseContract.ok("documentFolder.found", DocumentFolder.Entity.toEndpointSchema()),
		({ ownerDocumentFolder }, { response }) => response(
			"documentFolder.found",
			C.unwrapEntity(ownerDocumentFolder),
		),
	);
