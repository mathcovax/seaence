import { A, D, O } from "@duplojs/utils";
import { BackedDocument } from "@business/entities/bakedDocument";
import { Post } from "@business/entities/forum/post";
import { postConfig } from "@interfaces/configs/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { SchoolProvider } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/post-list")
	.extract({
		body: {
			documentId: BackedDocument.id,
			page: zod
				.number()
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

			const result = await SchoolProvider.findManyPost({
				nodeSameRawDocumentId: document.nodeSameRawDocumentId,
				quantityPerPage: postConfig.findPosts.quantityPerPage,
				page: page - postConfig.findPosts.pageOffset,
			});

			const posts = A.map(
				result.body,
				// theDate translation
				O.transformProperty(
					"createdAt",
					D.toISOString,
				),
			);

			return new OkHttpResponse(
				"postList.found",
				posts,
			);
		},
		makeResponseContract(OkHttpResponse, "postList.found", Post.index.array()),
	);
