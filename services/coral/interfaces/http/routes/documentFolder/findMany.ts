import { PartialDocumentFolderNameConstraint } from "@business/applications/repositories/documentFolder";
import { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, C, DPE, A, pipeCall, unwrap, forwardLog } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/find-many-document-folder")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			partialDocumentFolderName: PartialDocumentFolderNameConstraint.toExtractParser(),
			page: C.Int.toExtractParser(),
			quantityPerPage: C.PositiveInt.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("documentFolders.found", DocumentFolder.Entity.toEndpointSchema().array()),
		({ body }, { response }) => asyncPipe(
			useCases.ownerSearchDocumentFolderUseCase(body),
			A.map(
				pipeCall(C.unwrapEntity),
			),
			(result) => response("documentFolders.found", result),
		),
	);

const endpointDetailsDataParser = DPE.object({
	total: DPE.number(),
});

useRouteBuilder("POST", "/find-many-document-folders-details")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			partialDocumentFolderName: PartialDocumentFolderNameConstraint.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("documentFolders.foundDetails", endpointDetailsDataParser),
		({ body }, { response }) => useCases
			.ownerCountResultOfSearchDocumentUseCase(body)
			.then(
				(total) => response("documentFolders.foundDetails", { total: unwrap(total) }),
			),
	);

useRouteBuilder("POST", "/find-many-document-folders-in-which-document-exist")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			nodeSameRawDocumentId: NodeSameRawDocumentId.toExtractParser(),
			partialDocumentFolderName: PartialDocumentFolderNameConstraint.toExtractParser(),
			page: C.Int.toExtractParser(),
			quantityPerPage: C.PositiveInt.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("documentFolders.found", DocumentFolder.Entity.toEndpointSchema().array()),
		({ body }, { response }) => asyncPipe(
			useCases.ownerSearchIfNodeSameRawDocumentExistInTheseDocumentFoldersUseCase(body),
			A.map(
				pipeCall(C.unwrapEntity),
			),
			(result) => response("documentFolders.found", result),
		),
	);

useRouteBuilder("POST", "/find-many-document-folders-in-which-document-exist-details")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			partialDocumentFolderName: PartialDocumentFolderNameConstraint.toExtractParser(),
			nodeSameRawDocumentId: NodeSameRawDocumentId.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("documentFolders.foundDetails", endpointDetailsDataParser),
		({ body }, { response }) => useCases
			.countResultOfOwnerSearchIfNodeSameRawDocumentExistInTheseDocumentFoldersUseCase(body)
			.then(
				(total) => response("documentFolders.foundDetails", { total: unwrap(total) }),
			),
	);

