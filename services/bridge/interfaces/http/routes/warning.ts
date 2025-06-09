import { HarborAPI } from "@interfaces/providers/harbor";
import { entrypointCreatePostWarning } from "../schemas/warning";
import { iWantPostExistById } from "../checkers/post";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-post-warning")
	.extract({
		body: entrypointCreatePostWarning,
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("body").postId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const {
				body: {
					makeUserBan,
					userId,
					reason,
				},
				post,
			} = pickup(["body", "post"]);

			const harborReponse = await HarborAPI.createPostUserWarning({
				postId: post.id,
				userId,
				reason,
				makeUserBan,
			});

			return match(harborReponse)
				.with(
					{ information: "user.notfound" },
					() => new NotFoundHttpResponse("user.notfound"),
				)
				.with(
					{ information: "warning.created" },
					() => dropper(null),
				)
				.exhaustive();
		},
		undefined,
		makeResponseContract(NotFoundHttpResponse, "user.notfound"),
	)
	.handler(
		() => new CreatedHttpResponse(
			"warning.created",
		),
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);
