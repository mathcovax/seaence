import { Page } from "@business/entities/page";
import { D, O, P } from "@duplojs/utils";
import { SchoolProvider } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/post-moderation-page")
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolProvider.findOldestUnprocessedPost();

			return P.match(schoolResponse)
				.with(
					{ information: "oldestUnprocessedPost.notfound" },
					() => new NotFoundHttpResponse("postModerationPage.notfound"),
				)
				.with(
					{ information: "oldestUnprocessedPost.found" },
					({ body }) => dropper({ post: body }),
				)
				.exhaustive();
		},
		["post"],
		makeResponseContract(NotFoundHttpResponse, "postModerationPage.notfound"),
	)
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolProvider.getUnprocessedPostDetails();

			return P.match(schoolResponse)
				.with(
					{ information: "unprocessedPost.details" },
					({ body }) => dropper({
						details: {
							...body,
						},
					}),
				)
				.exhaustive();
		},
		["details"],
	)
	.handler(
		(pickup) => {
			const floorFragment = pickup(["details", "post"]);

			// theDate translation
			const post = O.transformProperty(
				floorFragment.post,
				"createdAt",
				D.toISOString,
			);

			return new OkHttpResponse(
				"postModerationPage.found",
				{
					post,
					unprocessedTotalCount: floorFragment.details.totalCount,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"postModerationPage.found",
			Page.moderationPost,
		),
	);
