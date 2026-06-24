import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, asyncPipe, C, DPE, E, unwrap } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";
import { useCases } from "@adapters/useCases";

useRouteBuilder("POST", "/find-many-available-post-by-node-same-raw-document")
	.extract({
		body: DPE.object({
			nodeSameRawDocumentId: Post.NodeSameRawDocumentId.toExtractParser(),
			page: C.PositiveInt.toExtractParser(),
			quantityPerPage: C.StrictPositiveInt.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("posts.found", Post.Entity.toEndpointSchema().array()),
		({ body }, { response }) => asyncPipe(
			useCases.findManyAvailablePostByNodeSameRawDocumentUseCase(body),
			E.unwrapSelectionOrThrow({
				"find-many-available-post-by-node-same-raw-document-success": true,
			}),
			A.map((post) => C.unwrapEntity(post)),
			(posts) => response("posts.found", posts),
		),
	);

useRouteBuilder("POST", "/find-many-available-post-by-node-same-raw-document-details")
	.extract({
		body: DPE.object({
			nodeSameRawDocumentId: Post.NodeSameRawDocumentId.toExtractParser(),
		}),
	})
	.handler(
		ResponseContract.ok("posts.foundDetails", DPE.object({ totalCount: DPE.number() })),
		({ body }, { response }) => postPort
			.getTotalCountAvailableByNodeSameRawDocument(body.nodeSameRawDocumentId)
			.then(
				(totalCount) => response("posts.foundDetails", {
					totalCount: unwrap(totalCount),
				}),
			),
	);
