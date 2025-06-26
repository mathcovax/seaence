import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { iWantNodeSameRawDocumentExist } from "../checkers/nodeSameRawDocument";
import { cookNodeSameRawDocumentUsecase, transformeNodeSameRawDocumentToBakedDocumentUsecase } from "@interfaces/usecase";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { match, P } from "ts-pattern";
import { TechnicalError, toSimpleObject } from "@vendors/clean";
import { endpointCookedNodeSameRawDocumentSchema } from "../schemas/nodeSameRawDocument";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";

useBuilder()
	.createRoute("POST", "/cook-node-same-raw-document")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			bakedDocumentLanguage: bakedDocumentLanguageObjecter.toZodSchema(),
			cookingMode: cookingModeObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist.rewriteIndexing("nodeSameRawDocument"),
		(pickup) => pickup("body").nodeSameRawDocumentId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { nodeSameRawDocument } = pickup(["nodeSameRawDocument"]);
			const { bakedDocumentLanguage, cookingMode } = pickup("body");

			const result = await cookNodeSameRawDocumentUsecase.execute({
				nodeSameRawDocument,
				bakedDocumentLanguage,
				cookingMode,
			});

			return match({ result })
				.with(
					{ result: { information: "unmatching-priority-raw-document" } },
					({ result: error }) => {
						throw new TechnicalError("unmatching-priority-raw-document", { error });
					},
				)
				.with(
					{ result: { nodeSameRawDocumentId: P.not(undefined) } },
					({ result: cookedNodeSameRawDocument }) => dropper({ cookedNodeSameRawDocument }),
				)
				.exhaustive();
		},
		["cookedNodeSameRawDocument"],
	)
	.handler(
		(pickup) => {
			const { cookedNodeSameRawDocument } = pickup(["cookedNodeSameRawDocument"]);

			return new OkHttpResponse("cookedNodeSameRawDocument.cook", toSimpleObject(cookedNodeSameRawDocument));
		},
		makeResponseContract(OkHttpResponse, "cookedNodeSameRawDocument.cook", endpointCookedNodeSameRawDocumentSchema),
	);

useBuilder()
	.createRoute("POST", "/transforme-node-same-raw-document-to-baked-document")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			bakedDocumentLanguage: bakedDocumentLanguageObjecter.toZodSchema(),
			cookingMode: cookingModeObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist.rewriteIndexing("nodeSameRawDocument"),
		(pickup) => pickup("body").nodeSameRawDocumentId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { nodeSameRawDocument } = pickup(["nodeSameRawDocument"]);
			const { bakedDocumentLanguage, cookingMode } = pickup("body");

			const result = await transformeNodeSameRawDocumentToBakedDocumentUsecase.execute({
				nodeSameRawDocument,
				cookingMode,
				bakedDocumentLanguages: [bakedDocumentLanguage],
			});

			return match({ result })
				.with(
					{ result: { information: "error-during-transformation" } },
					({ result: error }) => {
						throw new TechnicalError("unmatching-priority-raw-document", { error });
					},
				)
				.with(
					{ result: P.array() },
					() => dropper(null),
				)
				.exhaustive();
		},
	)
	.handler(
		() => new NoContentHttpResponse("nodeSameRawDocument.transformeBakedDocument"),
		makeResponseContract(NoContentHttpResponse, "nodeSameRawDocument.transformeBakedDocument"),
	);
