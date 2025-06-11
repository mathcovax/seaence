import { endpointPostSchema } from "@interfaces/http/schemas/post";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("GET", "find-oldest-unprocessed-post")
	.handler(
		async() => {
			const schoolResponse = await SchoolAPI.findOldestUnprocessedPost();

			return new OkHttpResponse(
				"oldestUnprocessedPost.found",
				schoolResponse.body,
			);
		},
		makeResponseContract(OkHttpResponse, "oldestUnprocessedPost.found", endpointPostSchema.nullable()),
	);
