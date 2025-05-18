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

			return new OkHttpResponse(
				"bakedDocument.get",
				bakedDocument.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "bakedDocument.get", endpointBakedDocumentSchema),
	);
