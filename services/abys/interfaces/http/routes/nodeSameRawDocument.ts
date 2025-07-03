import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { iWantNodeSameRawDocumentExist } from "../checkers/nodeSameRawDocument";
import { cookNodeSameRawDocumentUsecase, transformeNodeSameRawDocumentAndReindexBakedDocumentUsecase } from "@interfaces/usecase";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { match, P } from "ts-pattern";
import { TechnicalError, toSimpleObject } from "@vendors/clean";
import { endpointCookedNodeSameRawDocumentSchema, endpointFindNodeSameRawDocumentSchema } from "../schemas/nodeSameRawDocument";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";
import { BakedDocumentEntity } from "@business/domains/entities/bakedDocument";

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

			const result = await transformeNodeSameRawDocumentAndReindexBakedDocumentUsecase.execute({
				nodeSameRawDocument,
				cookingMode,
				bakedDocumentLanguage,
			});

			return match({ result })
				.with(
					{ result: { information: "unmatching-priority-raw-document" } },
					({ result: error }) => {
						throw new TechnicalError("unmatching-priority-raw-document", { error });
					},
				)
				.with(
					{ result: P.instanceOf(BakedDocumentEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
	)
	.handler(
		() => new NoContentHttpResponse("nodeSameRawDocument.transformeBakedDocument"),
		makeResponseContract(NoContentHttpResponse, "nodeSameRawDocument.transformeBakedDocument"),
	);

useBuilder()
	.createRoute("POST", "/find-node-same-raw-document")
	.extract({
		body: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist.rewriteIndexing("nodeSameRawDocument"),
		(pickup) => pickup("nodeSameRawDocumentId"),
	)
	.handler(
		(pickup) => {
			const { nodeSameRawDocument } = pickup(["nodeSameRawDocument"]);

			return new OkHttpResponse("nodeSameRawDocument.found", nodeSameRawDocument.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "nodeSameRawDocument.found", endpointFindNodeSameRawDocumentSchema),
	);
