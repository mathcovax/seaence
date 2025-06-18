import { documentConfig } from "@interfaces/configs/document";
import { iWantDocumentExistById } from "../checkers/document";
import { SchoolAPI } from "@interfaces/providers/school";
import { BackedDocument } from "@business/entities/bakedDocument";
import { Page } from "@business/entities/page";

useBuilder()
	.createRoute("POST", "/document-page")
	.extract({
		body: {
			bakedDocumentId: BackedDocument.id,
		},
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("bakedDocumentId"),
	)
	.handler(
		async(pickup) => {
			const { document } = pickup(["document"]);

			const { body: posts } = await SchoolAPI.findPosts(
				document.nodeSameRawDocumentId,
				documentConfig.findPosts.quantityPerPage,
				documentConfig.findPosts.defaultPage,
			);

			return new OkHttpResponse("documentPage.found", {
				document,
				posts,
			});
		},
		makeResponseContract(OkHttpResponse, "documentPage.found", Page.document),
	);
