import { documentConfig } from "@interfaces/configs/document";
import { iWantDocumentExistById } from "../checkers/document";
import { BackedDocument } from "@business/entities/bakedDocument";
import { Page } from "@business/entities/page";
import { SchoolProvider } from "@interfaces/providers/school";
import { A, D, O } from "@duplojs/utils";

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
			const document = pickup("document");

			const result = await SchoolProvider.findManyPost({
				nodeSameRawDocumentId: document.nodeSameRawDocumentId,
				quantityPerPage: documentConfig.findPosts.quantityPerPage,
				page: documentConfig.findPosts.defaultPage,
			});

			// theDate translation
			const posts = A.map(
				result.body,
				O.transformProperty(
					"createdAt",
					D.toISOString,
				),
			);

			return new OkHttpResponse("documentPage.found", {
				document,
				posts,
			});
		},
		makeResponseContract(OkHttpResponse, "documentPage.found", Page.document),
	);
