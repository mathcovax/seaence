import { entrypointCreatePostUserWarning } from "../schemas/warning";
import { createPostUserWarning } from "@interfaces/usecases";
import { IWantUserExistsById } from "../checkers/user";

useBuilder()
	.createRoute("POST", "/create-post-user-warning")
	.extract({
		body: entrypointCreatePostUserWarning,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").authorId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { body, user } = pickup(["body", "user"]);
			const { postId, reason, makeUserBan } = body;

			const warning = await createPostUserWarning.execute({
				postId,
				reason,
				makeUserBan,
				user,
			});

			return dropper({
				warning,
			});
		},
		["warning"],
	)
	.handler(
		() => new CreatedHttpResponse(
			"warning.created",
		),
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);
