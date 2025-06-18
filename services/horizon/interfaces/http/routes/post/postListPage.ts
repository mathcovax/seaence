import { BackedDocument } from "@business/entities/bakedDocument";
import { Page } from "@business/entities/page";
import { postConfig } from "@interfaces/configs/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { SchoolAPI } from "@interfaces/providers/school";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/post-list-page")
	.extract({
		body: {
			documentId: BackedDocument.id,
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("documentId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { document } = pickup(["document"]);
			const details = await SchoolAPI.findDocumentPostsDetails(document.nodeSameRawDocumentId);

			return match(details)
				.with(
					{ information: "document.posts.details" },
					({ body }) => dropper({ documentPostsDetails: body }),
				)
				.exhaustive();
		},
		["documentPostsDetails"],
	)
	.handler(
		(pickup) => {
			const { document, documentPostsDetails } = pickup(["document", "documentPostsDetails"]);

			return new OkHttpResponse(
				"postListPage.found",
				{
					document: {
						id: document.id,
						title: document.title,
						language: document.language,
					},
					totalPostCount: documentPostsDetails.totalCount,
					quantityPostPerPage: postConfig.findPosts.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "postListPage.found", Page.postList),
	);
