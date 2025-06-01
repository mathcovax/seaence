import { match } from "ts-pattern";
import { entrypointCreateWarning } from "../schemas/warning";
import { createPostWarning } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/create-warning")
	.extract({
		body: entrypointCreateWarning,
	})
	.cut(
		async({ pickup, dropper }) => {
			const { body } = pickup(["body"]);

			return match(body)
				.with(
					{ type: "post" },
					async(matchedBody) => dropper(
						{
							warning: await createPostWarning.execute({
								makeUserBan: matchedBody.makeUserBan,
								reason: matchedBody.reason,
								postId: matchedBody.postId,
							}),
						},
					),
				)
				.exhaustive();
		},
		["warning"],
	)
	.handler(
		() => new CreatedHttpResponse(
			"warning.created",
		),
		makeResponseContract(CreatedHttpResponse, "warning.created"),
	);
