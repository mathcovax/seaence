import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import { reportingBakedDocumentTranslationConfig } from "@interfaces/configs/reportingBakedDocumentTranslation";
import { BeaconAPI } from "@interfaces/providers/beacon";

useBuilder()
	.createRoute("POST", "/reporting-baked-document-translation-list-page")
	.handler(
		async() => {
			const { body: { countTotal } } = await BeaconAPI
				.findManyBakedDocumentTranslationReportingAggregateDetails();

			return new OkHttpResponse(
				"reportingBakedDocumentTranslationListPage.found",
				{
					countTotal,
					quantityPerPage: reportingBakedDocumentTranslationConfig.findManyAggregate.quantityPerPage,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"reportingBakedDocumentTranslationListPage.found",
			ReportingBakedDocumentTranslation.listPage,
		),
	);
