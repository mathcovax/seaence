import { type BakedDocumentId } from "@business/domains/common/bakedDocument";
import { findOneBakedDocumentTranslationReportingAggregateUsecase } from "@interfaces/usecase";

export const bakedDocumentTranslationReportingAggregateExistCheck
	= createChecker("bakedDocumentTranslationReportingAggregateExist")
		.handler(
			async(bakedDocumentId: BakedDocumentId, output) => {
				const result = await findOneBakedDocumentTranslationReportingAggregateUsecase
					.execute({ bakedDocumentId });

				if (result) {
					return output("bakedDocumentTranslationReportingAggregate.exist", result);
				} else {
					return output("bakedDocumentTranslationReportingAggregate.notfound", result);
				}
			},
		);

export const iWantBakedDocumentTranslationReportingAggregateExist = createPresetChecker(
	bakedDocumentTranslationReportingAggregateExistCheck,
	{
		result: "bakedDocumentTranslationReportingAggregate.exist",
		catch: () => new NotFoundHttpResponse("bakedDocumentTranslationReportingAggregate.notfound"),
		indexing: "bakedDocumentTranslationReportingAggregate",
	},
	makeResponseContract(
		NotFoundHttpResponse,
		"bakedDocumentTranslationReportingAggregate.notfound",
	),
);
