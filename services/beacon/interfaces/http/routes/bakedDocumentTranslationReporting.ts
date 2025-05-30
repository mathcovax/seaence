import { bakedDocumentIdObjecter } from "@business/domains/common/bakedDocument";
import { userIdObjecter } from "@business/domains/common/user";
import { BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { reportingDetailsObjecter } from "@business/domains/entities/reporting";
import { createBakedDocumentTranslationReportingUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-baked-document-translation-reporting")
	.extract({
		body: {
			userId: userIdObjecter.toZodSchema(),
			bakedDocumentId: bakedDocumentIdObjecter.toZodSchema(),
			reportingDetails: reportingDetailsObjecter.toZodSchema(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const {
				bakedDocumentId,
				reportingDetails,
				userId,
			} = pickup(["bakedDocumentId", "reportingDetails", "userId"]);

			const result = await createBakedDocumentTranslationReportingUsecase
				.execute({
					userId,
					reportingDetails,
					bakedDocumentId,
				});

			return match({ result })
				.with(
					{ result: { information: "reporting-already-exist" } },
					() => new ConflictHttpResponse("bakedDocumentTranslationReporting.alreadyExist"),
				)
				.with(
					{ result: P.instanceOf(BakedDocumentTranslationReportingEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ConflictHttpResponse, "bakedDocumentTranslationReporting.alreadyExist"),
	)
	.handler(
		() => new NoContentHttpResponse("bakedDocumentTranslationReporting.created"),
		makeResponseContract(NoContentHttpResponse, "bakedDocumentTranslationReporting.created"),
	);
