import { type NodeSameRawDocumentId } from "@business/domains/entities/nodeSameRawDocument";
import { type GetTypeInput } from "@duplojs/core";
import { findOneNodeSameRawDocumentUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const inputNodeSameRawDocumentExist = createTypeInput<{
	id: NodeSameRawDocumentId;
}>();

export const nodeSameRawDocumentExistCheck = createChecker("nodeSameRawDocumentExist")
	.handler(
		async(input: GetTypeInput<typeof inputNodeSameRawDocumentExist>, output) => {
			const nodeSameRawDocument = await match(input)
				.with(
					{ inputName: "id" },
					({ value }) => findOneNodeSameRawDocumentUsecase.execute({ nodeSameRawDocumentId: value }),
				)
				.exhaustive();

			if (nodeSameRawDocument) {
				return output("nodeSameRawDocument.exist", nodeSameRawDocument);
			}

			return output("nodeSameRawDocument.notfound", null);
		},
	);

export const iWantNodeSameRawDocumentExist = createPresetChecker(
	nodeSameRawDocumentExistCheck,
	{
		result: "nodeSameRawDocument.exist",
		catch: () => new ConflictHttpResponse("nodeSameRawDocument.alreadyExists"),
		transformInput: inputNodeSameRawDocumentExist.id,
	},
	makeResponseContract(ConflictHttpResponse, "nodeSameRawDocument.alreadyExists"),
);
