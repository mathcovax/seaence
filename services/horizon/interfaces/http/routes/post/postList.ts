import { BackedDocument } from "@business/entities/bakedDocument";
import { Post } from "@business/entities/forum/post";
import { postConfig } from "@interfaces/configs/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/post-list")
	.extract({
		body: {
			documentId: BackedDocument.id,
			page: zod.number()
				.min(postConfig.findPosts.pageOffset),
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
		makeResponseContract(OkHttpResponse, "postList.found", Post.index.array()),
	);
