import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import { reportingBakedDocumentTranslationConfig } from "@interfaces/configs/reportingBakedDocumentTranslation";
import { AbysAPI } from "@interfaces/providers/abys";
import { BeaconAPI } from "@interfaces/providers/beacon";

useBuilder()
	.createRoute("POST", "/reporting-baked-document-translation-aggregate-list")
	.extract({
		body: {
			page: zod.number().min(
				reportingBakedDocumentTranslationConfig.findManyAggregate.offsetPage,
			),
		},
	})
	.handler(
		async(pickup) => {
			const { page } = pickup(["page"]);

			const { body: reportingAggregateList } = await BeaconAPI.findManyBakedDocumentTranslationReportingAggregate(
				page - reportingBakedDocumentTranslationConfig.findManyAggregate.offsetPage,
				reportingBakedDocumentTranslationConfig.findManyAggregate.quantityPerPage,
			);

			const { body: backedTitleWrapper } = await AbysAPI.findManyBakedDocumentTitle(
				reportingAggregateList.map(({ bakedDocumentId }) => bakedDocumentId),
			);

			const list = reportingAggregateList.map(
				(reportingAggregate) => ({
					...reportingAggregate,
					bakedDocumentTitle: backedTitleWrapper[reportingAggregate.bakedDocumentId],
				}),
			);

			return new OkHttpResponse(
				"reportingBakeDocumentTranslationAggregateList.found",
				list,
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"reportingBakeDocumentTranslationAggregateList.found",
			ReportingBakedDocumentTranslation.aggregateList,
		),
	);
