import { intObjecter } from "@vendors/clean";
import { endpointFindManyBakedDocumentTranslationReportingAggregateDetailsSchema, endpointFindManyBakedDocumentTranslationReportingAggregateSchema } from "../schemas/bakedDocumentTranslationReportingAggregate";
import { countTotalBakedDocumentTranslationReportingAggregateUsecase, findManyBakedDocumentTranslationReportingAggregateUsecase } from "@interfaces/usecase";

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

			return new OkHttpResponse("bakedDocumentTranslationReportingAggregate.findMany", result);
		},
		makeResponseContract(
			OkHttpResponse,
			"bakedDocumentTranslationReportingAggregate.findMany",
			endpointFindManyBakedDocumentTranslationReportingAggregateSchema,
		),
	);

useBuilder()
	.createRoute("POST", "/find-many-baked-document-translation-reporting-aggregate-details")
	.handler(
		async() => {
			const countTotal = await countTotalBakedDocumentTranslationReportingAggregateUsecase
				.execute({});

			return new OkHttpResponse(
				"bakedDocumentTranslationReportingAggregate.findManyDetails",
				{ countTotal: countTotal.value },
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"bakedDocumentTranslationReportingAggregate.findManyDetails",
			endpointFindManyBakedDocumentTranslationReportingAggregateDetailsSchema,
		),
	);
