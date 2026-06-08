import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C } from "@duplojs/utils";
import { mustBeOwnerDocumentInFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentInFolder";

useRouteBuilder("POST", "/find-one-document-in-folder")
	.exec(
		mustBeOwnerDocumentInFolderProcess,
		{ imports: ["ownerDocumentInFolder"] },
	)
	.handler(
		ResponseContract.ok("documentInFolder.found", DocumentInFolder.Entity.toEndpointSchema()),
		({ ownerDocumentInFolder }, { response }) => response(
			"documentInFolder.found",
			C.unwrapEntity(ownerDocumentInFolder),
		),
	);
