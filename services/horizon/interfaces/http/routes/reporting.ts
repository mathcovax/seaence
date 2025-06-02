import { reportingDetailsObjecter } from "@business/entities/reporing";
import { iWantDocumentExistById } from "../checkers/document";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { BeaconAPI } from "@interfaces/providers/beacon";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/upsert-baked-document-translation-reporting")
	.extract({
		body: zod.object({
			bakedDocumentId: zod.string(),
			reportingDetails: reportingDetailsObjecter.zodSchema,
		}),
	})
	.presetCheck(
		iWantDocumentExistById,
		(pickup) => pickup("body").bakedDocumentId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { bakedDocumentId, reportingDetails } = pickup("body");
			const { user } = pickup(["user"]);

			const response = await BeaconAPI.upsertBakedDocumentTranslationReporting({
				userId: user.id,
				bakedDocumentId,
				reportingDetails,
			});

			return match(response)
				.with(
					{ information: "bakedDocumentTranslationReporting.upsert" },
					() => dropper(null),
				)
				.exhaustive();
		},
	)
	.handler(
		() => new NoContentHttpResponse("bakedDocumentTranslationReporting.upsert"),
		makeResponseContract(NoContentHttpResponse, "bakedDocumentTranslationReporting.upsert"),
	);
