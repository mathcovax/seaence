import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { reportingDetailsObjecter } from "@business/domains/entities/reporting";
import { countTotalBakedDocumentTranslationReportingByBakedDocumentIdUsecase, findManyBakedDocumentTranslationReportingUsecase, upsertBakedDocumentTranslationReportingUsecase } from "@interfaces/usecase";
import { intObjecter } from "@vendors/clean";
import { endpointFindManyBakedDocumentTranslationReportingDetailsSchema, endPointFindManyBakedDocumentTranslationReportingEntitySchema } from "../schemas/bakedDocumentTranslationReporting";

useBuilder()
	.createRoute("POST", "/upsert-baked-document-translation-reporting")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
			reportingDetails: reportingDetailsObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				bakedDocumentId,
				reportingDetails,
				userId,
			} = pickup("body");

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

useBuilder()
	.createRoute("POST", "/find-many-baked-document-translation-reporting/{bakedDocumentId}")
	.extract({
		params: {
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
		},
		body: zod.object({
			quantityPerPage: intObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { bakedDocumentId } = pickup(["bakedDocumentId"]);
			const { quantityPerPage, page } = pickup("body");

			const result = await findManyBakedDocumentTranslationReportingUsecase
				.execute({
					page,
					quantityPerPage,
					bakedDocumentId,
				})
				.then(
					(bakedDocumentTranslationReportingEntitys) => bakedDocumentTranslationReportingEntitys.map(
						(bakedDocumentTranslationReportingEntity) => bakedDocumentTranslationReportingEntity
							.toSimpleObject(),
					),
				);

			return new OkHttpResponse("bakedDocumentTranslationReporting.findMany", result);
		},
		makeResponseContract(
			OkHttpResponse,
			"bakedDocumentTranslationReporting.findMany",
			endPointFindManyBakedDocumentTranslationReportingEntitySchema,
		),
	);

useBuilder()
	.createRoute("POST", "/find-many-baked-document-translation-reporting-details/{bakedDocumentId}")
	.extract({
		params: {
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
		},
	})
	.handler(
		async(pickup) => {
			const { bakedDocumentId } = pickup(["bakedDocumentId"]);

			const countTotal = await countTotalBakedDocumentTranslationReportingByBakedDocumentIdUsecase
				.execute({
					bakedDocumentId,
				});

			return new OkHttpResponse(
				"bakedDocumentTranslationReporting.findManyDetails",
				{ countTotal: countTotal.value },
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"bakedDocumentTranslationReporting.findManyDetails",
			endpointFindManyBakedDocumentTranslationReportingDetailsSchema,
		),
	);
