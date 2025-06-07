import { HarborAPI } from "@interfaces/providers/harbor";
import { entrypointCreatePostWarning } from "../schemas/warning";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/create-post-warning")
	.extract({
		body: entrypointCreatePostWarning,
	})
	.cut(
		async({ pickup, dropper }) => {
			const { makeUserBan, postId, authorId, reason } = pickup("body");

			const schoolResponse = await SchoolAPI.findPost(postId);

			if (schoolResponse.information === "post.notfound") {
				return new NotFoundHttpResponse("post.notfound");
			}

			await HarborAPI.createPostUserWarning({
				postId,
				authorId,
				reason,
				makeUserBan,
			});

			return dropper(null);
		},
		undefined,
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		() => new CreatedHttpResponse(
			"warning.created",
		),
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);
