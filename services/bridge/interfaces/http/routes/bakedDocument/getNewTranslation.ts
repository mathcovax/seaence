import { BakedDocument } from "@business/entities/bakedDocument";
import { AbysAPI } from "@interfaces/providers/abys";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/get-new-baked-document-translation")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: zod.string(),
			bakedDocumentLanguage: BakedDocument.language,
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const {
				nodeSameRawDocumentId,
				bakedDocumentLanguage,
			} = pickup("body");

			const result = await AbysAPI
				.cookNodeSameRawDocument(
					nodeSameRawDocumentId,
					bakedDocumentLanguage,
				);

			return match(result)
				.with(
					{ information: "nodeSameRawDocument.notfound" },
					() => new NotFoundHttpResponse("nodeSameRawDocument.notfound"),
				)
				.with(
					{ information: "cookedNodeSameRawDocument.cook" },
					({ body }) => dropper({
						bakedDocument: {
							title: body.title,
							abstract: body.abstract,
							abstractDetails: body.abstractDetails,
							keywords: body.keywords.map(
								(keyword) => keyword.value,
							),
						},
					}),
				)
				.exhaustive();
		},
		["bakedDocument"],
		makeResponseContract(NotFoundHttpResponse, "nodeSameRawDocument.notfound"),
	)
	.handler(
		(pickup) => {
			const { bakedDocument } = pickup(["bakedDocument"]);

			return new OkHttpResponse(
				"bakedDocument.getNewTranslation",
				bakedDocument,
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"bakedDocument.getNewTranslation",
			BakedDocument.newTranslation,
		),
	);
