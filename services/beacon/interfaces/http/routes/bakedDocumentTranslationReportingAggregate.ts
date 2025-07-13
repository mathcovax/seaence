import { intObjecter } from "@vendors/clean";
import { endpointFindManyBakedDocumentTranslationReportingAggregateDetailsSchema, endpointFindManyBakedDocumentTranslationReportingAggregateSchema } from "../schemas/bakedDocumentTranslationReportingAggregate";
import { countTotalBakedDocumentTranslationReportingAggregateUsecase, findManyBakedDocumentTranslationReportingAggregateUsecase, processesBakedDocumentTranslationReportingAggregateUsecase } from "@interfaces/usecase";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/common/nodeSameRawDocument";
import { bakedDocumentIdObjecter, bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocument";
import { iWantBakedDocumentTranslationReportingAggregateExist } from "../checkers/bakedDocumentTranslationReportingAggregate";

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

useBuilder()
	.createRoute("POST", "/baked-document-translation-reporting-aggregate/process/{bakedDocumentId}")
	.extract({
		params: {
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
		},
		body: zod.object({
			cookingMode: cookingModeObjecter.toZodSchema(),
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			bakedDocumentLanguage: bakedDocumentLanguageObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantBakedDocumentTranslationReportingAggregateExist,
		(pickup) => pickup("bakedDocumentId"),
	)
	.handler(
		async(pickup) => {
			const {
				bakedDocumentTranslationReportingAggregate,
				body,
			} = pickup(["bakedDocumentTranslationReportingAggregate", "body"]);

			await processesBakedDocumentTranslationReportingAggregateUsecase
				.execute({
					bakedDocumentTranslationReportingAggregate,
					...body,
				});

			return new NoContentHttpResponse("bakedDocumentTranslationReportingAggregate.processed");
		},
		makeResponseContract(NoContentHttpResponse, "bakedDocumentTranslationReportingAggregate.processed"),
	);
