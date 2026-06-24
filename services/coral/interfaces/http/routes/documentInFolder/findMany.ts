import { PartialDocumentInFolderNameConstraint } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, asyncPipe, C, DPE, pipeCall, unwrap } from "@duplojs/utils";
import { mustBeOwnerDocumentFolderProcess } from "@interfaces/http/process/mustBeOwnerDocumentFolder";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/find-many-document-in-folder")
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.extract({
		body: {
			partialDocumentInFolderName: PartialDocumentInFolderNameConstraint.toExtractParser(),
			page: C.Int.toExtractParser(),
			quantityPerPage: C.PositiveInt.toExtractParser(),
		},
	})
	.handler(
		ResponseContract.ok("documentsInFolder.found", DocumentInFolder.Entity.toEndpointSchema().array()),
		(floor, { response }) => asyncPipe(
			useCases.ownerSearchDocumentInFolderUseCase(floor),
			A.map(pipeCall(C.unwrapEntity)),
			(result) => response("documentsInFolder.found", result),
		),
	);

const endpointDetailDataParser = DPE.object({
	total: DPE.number(),
});

useRouteBuilder("POST", "/find-many-document-in-folder-details")
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.extract({
		body: {
			partialDocumentInFolderName: PartialDocumentInFolderNameConstraint.toExtractParser(),
		},
	})
	.handler(
		ResponseContract.ok("documentsInFolder.foundDetails", endpointDetailDataParser),
		(floor, { response }) => useCases.countResultOfOwnerSearchDocumentInFolderUseCase(floor)
			.then(
				(count) => response("documentsInFolder.foundDetails", { total: unwrap(count) }),
			),
	);
