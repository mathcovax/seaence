import { P } from "@duplojs/utils";
import { BackedDocument } from "@business/entities/bakedDocument";
import { Page } from "@business/entities/page";
import { postConfig } from "@interfaces/configs/post";
import { iWantDocumentExistById } from "@interfaces/http/checkers/document";
import { SchoolProvider } from "@interfaces/providers/school";

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
			const { nodeSameRawDocumentId } = pickup("document");
			const details = await SchoolProvider.findManyPostDetails({ nodeSameRawDocumentId });

			return P.match(details)
				.with(
					{ information: "posts.foundDetails" },
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
