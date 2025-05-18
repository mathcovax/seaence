import { bakedDocumentIdObjecter } from "@business/domains/entities/bakedDocument";
import { IWantBakedDocumentExistsById } from "../checkers/bakedDocument";
import { endpointBakedDocumentSchema } from "../schemas/bakedDocument";

useBuilder()
	.createRoute("GET", "/baked-document/{id}")
	.extract({
		params: {
			id: bakedDocumentIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		IWantBakedDocumentExistsById,
		(pickup) => pickup("id"),
	)
	.handler(
		(pickup) => {
			const bakedDocument = pickup("bakedDocument");

			const { lastExportOnSea, lastUpdate, ...simpleBackedDocument } = bakedDocument.toSimpleObject();
			return new OkHttpResponse(
				"bakedDocument.get",
				simpleBackedDocument,
			);
		},
		makeResponseContract(OkHttpResponse, "bakedDocument.get", endpointBakedDocumentSchema),
	);
