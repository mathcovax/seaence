import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import { reportingBakedDocumentTranslationConfig } from "@interfaces/configs/reportingBakedDocumentTranslation";
import { BeaconAPI } from "@interfaces/providers/beacon";

useBuilder()
	.createRoute("POST", "/reporting-baked-document-translation-list")
	.extract({
		body: zod.object({
			bakedDocumentId: zod.string(),
			page: zod.number().min(
				reportingBakedDocumentTranslationConfig.findMany.offsetPage,
			),
		}),
	})
	.handler(
		async(pickup) => {
			const { bakedDocumentId, page } = pickup("body");

			const { body: rawList } = await BeaconAPI.findManyBakedDocumentTranslationReporting(
				bakedDocumentId,
				page - reportingBakedDocumentTranslationConfig.findMany.offsetPage,
				reportingBakedDocumentTranslationConfig.findMany.quantityPerPage,
			);

			return new OkHttpResponse(
				"reportingDakedDocumentTranslationList.found",
				rawList,
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"reportingDakedDocumentTranslationList.found",
			ReportingBakedDocumentTranslation.list,
		),
	);
