import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { reportingDetailsObjecter } from "@business/domains/entities/reporting";
import { upsertBakedDocumentTranslationReportingUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/upsert-baked-document-translation-reporting")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
			reportingDetails: reportingDetailsObjecter.toZodSchema(),
		},
	})
	.handler(
		async(pickup) => {
			const {
				bakedDocumentId,
				reportingDetails,
				userId,
			} = pickup(["bakedDocumentId", "reportingDetails", "userId"]);

			await upsertBakedDocumentTranslationReportingUsecase
				.execute({
					userId,
					reportingDetails,
					bakedDocumentId,
				});

			return new NoContentHttpResponse("bakedDocumentTranslationReporting.upsert");
		},
		makeResponseContract(NoContentHttpResponse, "bakedDocumentTranslationReporting.upsert"),
	);
