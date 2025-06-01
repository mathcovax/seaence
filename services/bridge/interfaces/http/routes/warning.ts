import { HarborAPI } from "@interfaces/providers/harbor";
import { entrypointCreateWarning } from "../schemas/warning";
import { match } from "ts-pattern";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/create-warning")
	.extract({
		body: entrypointCreateWarning,
	})
	.cut(
		async({ pickup, dropper }) => {
			const warning = pickup("body");

			return match(warning)
				.with(
					{ type: "post" },
					async(matchedWarning) => {
						const schoolResponse = await SchoolAPI.findPost(matchedWarning.postId);

						if (schoolResponse.information === "post.notfound") {
							return new NotFoundHttpResponse("post.notfound");
						}

						await HarborAPI.createWarning(matchedWarning);

						return dropper(null);
					},
				)
				.exhaustive();
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
