import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { iWantNodeSameRawDocumentExist } from "../checkers/nodeSameRawDocument";
import { cookNodeSameRawDocumentUsecase, transformeNodeSameRawDocumentToBakedDocumentUsecase } from "@interfaces/usecase";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { match, P } from "ts-pattern";
import { TechnicalError, toSimpleObject } from "@vendors/clean";
import { endpointCookedNodeSameRawDocumentSchema } from "../schemas/nodeSameRawDocument";

useBuilder()
	.createRoute("POST", "/cook-node-same-raw-document")
	.extract({
		body: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			bakedDocumentLanguage: bakedDocumentLanguageObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist.rewriteIndexing("nodeSameRawDocument"),
		(pickup) => pickup("nodeSameRawDocumentId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { nodeSameRawDocument, bakedDocumentLanguage } = pickup(["nodeSameRawDocument", "bakedDocumentLanguage"]);

			const result = await cookNodeSameRawDocumentUsecase.execute({
				nodeSameRawDocument,
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
		body: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			bakedDocumentLanguage: bakedDocumentLanguageObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist.rewriteIndexing("nodeSameRawDocument"),
		(pickup) => pickup("nodeSameRawDocumentId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { nodeSameRawDocument, bakedDocumentLanguage } = pickup(["nodeSameRawDocument", "bakedDocumentLanguage"]);

			const result = await transformeNodeSameRawDocumentToBakedDocumentUsecase.execute({
				nodeSameRawDocument,
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
		() => new OkHttpResponse("nodeSameRawDocument.transformeBakedDocument"),
		makeResponseContract(OkHttpResponse, "nodeSameRawDocument.transformeBakedDocument"),
	);
