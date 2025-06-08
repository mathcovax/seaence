import { ReportingBakedDocumentTranslation } from "@business/entities/reporting/bakedDocumentTranslation";
import { reportingBakedDocumentTranslationConfig } from "@interfaces/configs/reportingBakedDocumentTranslation";
import { iWantBakedDocumentExistById } from "@interfaces/http/checkers/bakedDocument";
import { BeaconAPI } from "@interfaces/providers/beacon";

useBuilder()
	.createRoute("POST", "/reporting-baked-document-translation-page")
	.extract({
		body: {
			bakedDocumentId: zod.string(),
		},
	})
	.presetCheck(
		iWantBakedDocumentExistById,
		(pickup) => pickup("bakedDocumentId"),
	)
	.handler(
		async(pickup) => {
			const { bakedDocument: abysBakedDocument } = pickup(["bakedDocument"]);

			const { body: { countTotal } } = await BeaconAPI
				.findManyBakedDocumentTranslationReportingDetails(abysBakedDocument.id);

			const bakedDocument = {
				id: abysBakedDocument.id,
				nodeSameRawDocumentId: abysBakedDocument.nodeSameRawDocumentId,
				language: abysBakedDocument.language,
				title: abysBakedDocument.title,
				abstract: abysBakedDocument.abstract,
				abstractDetails: abysBakedDocument.abstractDetails,
				keywords: abysBakedDocument.keywords.map(
					(keyword) => keyword.value,
				),
			};

			const reporting = {
				countTotal,
				quantityPerPage: reportingBakedDocumentTranslationConfig
					.findMany.quantityPerPage,
			};

			return new OkHttpResponse(
				"reportingBakedDocumentTranslationPage.found",
				{
					bakedDocument,
					reporting,
				},
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"reportingBakedDocumentTranslationPage.found",
			ReportingBakedDocumentTranslation.page,
		),
	);
