import { bakedDocumentIdObjecter } from "@business/domains/entities/bakedDocument";
import { IWantBakedDocumentExistsById } from "../checkers/bakedDocument";
import { endpointBakedDocumentSchema, endpointFindManyBakedDocumentNotfoundSchema, endpointFindManyBakedDocumentTitleSchema } from "../schemas/bakedDocument";
import { findManyBakedDocumentByIdUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";
import { toSimpleObject } from "@vendors/clean";

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

			const { lastIndexation, lastUpdate, ...simpleBackedDocument } = bakedDocument.toSimpleObject();
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
	.cut(
		async({ pickup, dropper }) => {
			const { bakedDocumentIds } = pickup(["bakedDocumentIds"]);

			const result = await findManyBakedDocumentByIdUsecase
				.execute({
					bakedDocumentIds,
				});

			return match({ result })
				.with(
					{ result: { information: "notfound-baked-document" } },
					({ result: error }) => new NotFoundHttpResponse(
						"bakedDocuments.notfound",
						{ notfoundBakedDocumentIds: toSimpleObject(error.moreData.bakedDocumentIds) },
					),
				)
				.with(
					{ result: P.instanceOf(Array) },
					({ result: bakedDocuments }) => dropper({
						bakedDocumentTitleWrapper: bakedDocuments
							.reduce<Record<string, string>>(
								(acc, bakedDocument) => ({
									...acc,
									[bakedDocument.id.value]: bakedDocument.title.value,
								}),
								{},
							),
					}),
				)
				.exhaustive();
		},
		["bakedDocumentTitleWrapper"],
		makeResponseContract(NotFoundHttpResponse, "bakedDocuments.notfound", endpointFindManyBakedDocumentNotfoundSchema),
	)
	.handler(
		(pickup) => {
			const { bakedDocumentTitleWrapper } = pickup(["bakedDocumentTitleWrapper"]);

			return new OkHttpResponse("bakedDocumentTitle.findMany", bakedDocumentTitleWrapper);
		},
		makeResponseContract(OkHttpResponse, "bakedDocumentTitle.findMany", endpointFindManyBakedDocumentTitleSchema),
	);

