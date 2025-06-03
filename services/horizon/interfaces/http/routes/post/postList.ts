import { postConfig } from "@interfaces/configs/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { endpointPostSchema } from "@interfaces/http/schemas/post";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/post-list")
	.extract({
		body: {
			documentId: zod.string(),
			page: zod.number(),
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.handler(
		async(pickup) => {
			const { page, document } = pickup(["page", "document"]);

			const { body: posts } = await SchoolAPI.findPosts(
				document.nodeSameRawDocumentId,
				postConfig.findPosts.quantityPerPage,
				page - postConfig.findPosts.pageOffset,
			);

			return new OkHttpResponse(
				"postList.found",
				posts,
			);
		},
		makeResponseContract(OkHttpResponse, "postList.found", endpointPostSchema.array()),
	);
