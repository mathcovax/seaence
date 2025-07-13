import { BakedDocument } from "@business/entities/bakedDocument";
import { BeaconAPI } from "@interfaces/providers/beacon";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}")
	.extract({
		params: {
			bakedDocumentId: zod.string(),
		},
		body: zod.object({
			nodeSameRawDocumentId: zod.string(),
			bakedDocumentLanguage: BakedDocument.language,
			cookingMode: BakedDocument.cookingMode,
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const {
				bakedDocumentId,
				body,
			} = pickup(["bakedDocumentId", "body"]);

			const result = await BeaconAPI
				.processBakedDocumentTranslationReportingAggregate(
					bakedDocumentId,
					body,
				);

			return match(result)
				.with(
					{ information: "bakedDocumentTranslationReportingAggregate.notfound" },
					() => new NotFoundHttpResponse("nodeSameRawDocument.notfound"),
				)
				.with(
					{ information: "bakedDocumentTranslationReportingAggregate.processed" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "nodeSameRawDocument.notfound"),
	)
	.handler(
		() => new NoContentHttpResponse("bakedDocumentTranslationReportingAggregate.processed"),
		makeResponseContract(
			NoContentHttpResponse,
			"bakedDocumentTranslationReportingAggregate.processed",
		),
	);
