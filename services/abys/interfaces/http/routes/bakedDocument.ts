import { bakedDocumentIdObjecter } from "@business/domains/entities/bakedDocument";
import { IWantBakedDocumentExistsById } from "../checkers/bakedDocument";
import { endpointBakedDocumentSchema, endpointFindManyBakedDocumentTitleSchema } from "../schemas/bakedDocument";
import { findManyBakedDocumentByIdUsecase } from "@interfaces/usecase";

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

useBuilder()
	.createRoute("POST", "/find-many-baked-document-title")
	.extract({
		body: {
			bakedDocumentIds: bakedDocumentIdObjecter
				.toZodSchema()
				.array(),
		},
	})
	.handler(
		async(pickup) => {
			const { bakedDocumentIds } = pickup(["bakedDocumentIds"]);

			const bakedDocumentTitles = await findManyBakedDocumentByIdUsecase
				.execute({
					bakedDocumentIds,
				})
				.then(
					(bakedDocuments) => bakedDocuments.map(
						(bakedDocument) => bakedDocument.title.value,
					),
				);

			return new OkHttpResponse("bakedDocumentTitle.findMany", bakedDocumentTitles);
		},
		makeResponseContract(OkHttpResponse, "bakedDocumentTitle.findMany", endpointFindManyBakedDocumentTitleSchema),
	);

