import { Page } from "@business/entities/page";
import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/post-moderation-page")
	.cut(
		async({ dropper }) => {
			const schoolResponse = await SchoolAPI.findOldestUnprocessedPost();

			return match(schoolResponse)
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
			const schoolResponse = await SchoolAPI.getUnprocessedPostDetails();

			return match(schoolResponse)
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
			const { details, post } = pickup(["details", "post"]);

			return new OkHttpResponse(
				"postModerationPage.found",
				{
					post,
					unprocessedTotalCount: details.totalCount,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"postModerationPage.found",
			Page.moderationPost,
		),
	);
