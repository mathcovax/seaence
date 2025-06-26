import { BakedDocument } from "@business/entities/bakedDocument";
import { AbysAPI } from "@interfaces/providers/abys";
import { BeaconAPI } from "@interfaces/providers/beacon";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/make-new-baked-document-translation")
	.extract({
		body: zod.object({
			bakedDocumentId: zod.string(),
			nodeSameRawDocumentId: zod.string(),
			bakedDocumentLanguage: BakedDocument.language,
			cookingMode: BakedDocument.cookingMode,
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const {
				nodeSameRawDocumentId,
				bakedDocumentLanguage,
				cookingMode,
			} = pickup("body");

			const result = await AbysAPI
				.transformeNodeSameRawDocumentToBakedDocument({
					nodeSameRawDocumentId,
					bakedDocumentLanguage,
					cookingMode,
				});

			return match(result)
				.with(
					{ information: "nodeSameRawDocument.notfound" },
					() => new NotFoundHttpResponse("nodeSameRawDocument.notfound"),
				)
				.with(
					{ information: "nodeSameRawDocument.transformeBakedDocument" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "nodeSameRawDocument.notfound"),
	)
	.handler(
		async(pickup) => {
			const { bakedDocumentId } = pickup("body");

			await BeaconAPI.deleteManyBakedDocumentTranslationReporting(bakedDocumentId);

			return new NoContentHttpResponse("bakedDocument.makeNewTranslation");
		},
		makeResponseContract(
			NoContentHttpResponse,
			"bakedDocument.makeNewTranslation",
		),
	);
