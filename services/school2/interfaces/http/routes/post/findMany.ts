import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, C, DPE, pipeCall, unwrap } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";

useRouteBuilder("POST", "/find-many-post-by-node-same-raw-document")
	.extract({
		body: DPE.object({
			nodeSameRawDocumentId: Post.NodeSameRawDocumentId.toExtractParser(),
			page: C.PositiveInt.toExtractParser(),
			quantityPerPage: C.StrictPositiveInt.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("posts.found", Post.Entity.toEndpointSchema().array()),
		({ body }, { response }) => postPort
			.findManyByNodeSameRawDocument(body)
			.then(
				A.map(pipeCall(C.unwrapEntity)),
			)
			.then(
				(posts) => response("posts.found", posts),
			),
	);

const detailsDataParser = DPE.object({
	totalCount: DPE.number(),
});

useRouteBuilder("POST", "/find-many-post-by-node-same-raw-document-details")
	.extract({
		body: DPE.object({
			nodeSameRawDocumentId: Post.NodeSameRawDocumentId.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("posts.foundDetails", detailsDataParser),
		({ body }, { response }) => postPort
			.getTotalCountByNodeSameRawDocument(body.nodeSameRawDocumentId)
			.then(
				(totalCount) => response("posts.foundDetails", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
