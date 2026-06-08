import { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { UserId } from "@business/domains/common/user";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, DPE, unwrap, A } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

const endPointDataParser = DPE.string().array();

useRouteBuilder("POST", "/node-same-raw-document-ids-have-document-in-folder")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			nodeSameRawDocumentIds: NodeSameRawDocumentId.toExtractParser().array(),
		}),
	})
	.handler(
		ResponseContract.ok(
			"nodeSameRawDocumentIdsHaveDocumentInFolder.found",
			endPointDataParser,
		),
		({ body }, { response }) => asyncPipe(
			useCases.nodeSameRawDocumentIdsHaveDocumentInFolderUseCase(body),
			(nodeSameRawDocumentIds) => response(
				"nodeSameRawDocumentIdsHaveDocumentInFolder.found",
				A.map(
					nodeSameRawDocumentIds,
					unwrap,
				),
			),
		),
	);
