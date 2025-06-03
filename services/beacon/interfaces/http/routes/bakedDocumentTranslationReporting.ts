import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { reportingDetailsObjecter } from "@business/domains/entities/reporting";
import { findManyBakedDocumentTranslationReportingUsecase, upsertBakedDocumentTranslationReportingUsecase } from "@interfaces/usecase";
import { intObjecter } from "@vendors/clean";
import { endPointFindManyBakedDocumentTranslationReportingEntitySchema } from "../schemas/bakedDocumentTranslationReporting";

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
	.createRoute("POST", "/find-many-baked-document-translation-reporting")
	.extract({
		body: zod.object({
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
			quantityPerPage: intObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { quantityPerPage, page, bakedDocumentId } = pickup("body");

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
		makeResponseContract(OkHttpResponse, "bakedDocumentTranslationReporting.findMany", endPointFindManyBakedDocumentTranslationReportingEntitySchema),
	);
