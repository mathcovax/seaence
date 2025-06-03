import { intObjecter } from "@vendors/clean";
import { endpointFindManyBakedDocumentTranslationReportingAggregateSchema } from "../schemas/bakedDocumentTranslationReportingAggregate";
import { findManyBakedDocumentTranslationReportingAggregateUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/find-many-baked-document-translation-reporting-aggregate")
	.extract({
		body: zod.object({
			quantityPerPage: intObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { quantityPerPage, page } = pickup("body");

			const result = await findManyBakedDocumentTranslationReportingAggregateUsecase
				.execute({
					page,
					quantityPerPage,
				})
				.then(
					(
						BakedDocumentTranslationReportingAggregateEntitys,
					) => BakedDocumentTranslationReportingAggregateEntitys
						.map(
							(
								BakedDocumentTranslationReportingAggregateEntity,
							) => BakedDocumentTranslationReportingAggregateEntity
								.toSimpleObject(),
						),
				);

			return new OkHttpResponse("bakedDocumentTranslationReporting.findMany", result);
		},
		makeResponseContract(OkHttpResponse, "bakedDocumentTranslationReporting.findMany", endpointFindManyBakedDocumentTranslationReportingAggregateSchema),
	);
