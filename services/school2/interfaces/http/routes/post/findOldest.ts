import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { C, E, innerPipe } from "@duplojs/utils";
import { postPort } from "@adapters/ports";
import { Post } from "@domains/entities/post";

useRouteBuilder("POST", "/find-oldest-unprocessed-post")
	.handler(
		[
			ResponseContract.ok("oldestUnprocessedPost.found", Post.Entity.toEndpointSchema()),
			ResponseContract.notFound("oldestUnprocessedPost.notfound"),
		],
		(_floor, { response }) => postPort
			.findOldestUnprocessed()
			.then(
				innerPipe(
					E.whenIsLeft(
						() => response("oldestUnprocessedPost.notfound"),
					),
					E.whenIsRight(
						(post) => response(
							"oldestUnprocessedPost.found",
							C.unwrapEntity(post),
						),
					),
				),
			),
	);
