import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, DPE, E, innerPipe } from "@duplojs/utils";
import { Post } from "@domains/entities/post";
import { iWantPostExistsById } from "@http/checkers";
import { useCases } from "@adapters/useCases";

useRouteBuilder("POST", "/find-one-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
		}),
	})
	.presetCheck(
		iWantPostExistsById,
		(floor) => floor.body.postId,
	)
	.handler(
		ResponseContract.ok("post.found", Post.Entity.toEndpointSchema()),
		({ post }, { response }) => response(
			"post.found",
			C.unwrapEntity(post),
		),
	);

useRouteBuilder("POST", "/find-one-available-post")
	.extract({
		body: DPE.object({
			postId: Post.Id.toExtractParser(),
		}),
	})
	.handler(
		[
			ResponseContract.ok("availablePost.found", Post.Entity.toEndpointSchema()),
			ResponseContract.notFound("availablePost.notfound"),
		],
		(floor, { response }) => useCases
			.findOneAvailablePostById({ postId: floor.body.postId })
			.then(
				E.whenHasInformation(
					"find-one-available-post-by-id-success",
					innerPipe(
						E.whenIsLeft(
							() => response("availablePost.notfound"),
						),
						E.whenIsRight(
							(post) => response(
								"availablePost.found",
								C.unwrapEntity(post),
							),
						),
					),
				),
			),
	);
