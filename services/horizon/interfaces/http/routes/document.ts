import { documentConfig } from "@interfaces/configs/document";
import { iWantDocumentExistById } from "../checkers/document";
import { endpointDocumentPage } from "../schemas/document";
import { SchoolAPI } from "@interfaces/providers/school";

useBuilder()
	.createRoute("POST", "/document-page")
	.extract({
		body: zod.object({
			bakedDocumentId: zod.string(),
		}),
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("body").bakedDocumentId,
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
		makeResponseContract(OkHttpResponse, "documentPage.found", endpointDocumentPage),
	);
