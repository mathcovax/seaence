import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import { reportingBakedDocumentTranslationConfig } from "@interfaces/configs/reportingBakedDocumentTranslation";
import { BeaconAPI } from "@interfaces/providers/beacon";

useBuilder()
	.createRoute("POST", "/reporting-baked-document-translation-aggregate-list-page")
	.handler(
		async() => {
			const { body: { countTotal } } = await BeaconAPI
				.findManyBakedDocumentTranslationReportingAggregateDetails();

			return new OkHttpResponse(
				"reportingBakedDocumentTranslationAggregateListPage.found",
				{
					countTotal,
					quantityPerPage: reportingBakedDocumentTranslationConfig.findManyAggregate.quantityPerPage,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"reportingBakedDocumentTranslationAggregateListPage.found",
			ReportingBakedDocumentTranslation.listPage,
		),
	);
