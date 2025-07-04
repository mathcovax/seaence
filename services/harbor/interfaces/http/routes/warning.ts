import { entrypointCreateAnswerUserWarning, entrypointCreatePostUserWarning } from "../schemas/warning";
import { createAnswerUserWarning, createPostUserWarning } from "@interfaces/usecases";
import { IWantUserExistsById } from "../checkers/user";

useBuilder()
	.createRoute("POST", "/create-post-user-warning")
	.extract({
		body: entrypointCreatePostUserWarning,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const {
				body: {
					postId,
					reason,
					makeUserBan,
				},
				user,
			} = pickup(["body", "user"]);

			await createPostUserWarning.execute({
				postId,
				reason,
				makeUserBan,
				user,
			});

			return new CreatedHttpResponse(
				"warning.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);

useBuilder()
	.createRoute("POST", "/create-answer-user-warning")
	.extract({
		body: entrypointCreateAnswerUserWarning,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const {
				body: {
					postId,
					reason,
					makeUserBan,
					answerId,
				},
				user,
			} = pickup(["body", "user"]);

			await createAnswerUserWarning.execute({
				postId,
				answerId,
				reason,
				makeUserBan,
				user,
			});

			return new CreatedHttpResponse(
				"warning.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);
