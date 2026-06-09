import { asyncPipe, C, E, innerPipe } from "@duplojs/utils";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";

interface Input {
	ownerDocumentFolder: DocumentFolder.Entity & DocumentFolder.WithCheckedOwner;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export const OwnerFindDocumentInFolderByUniqueCombinationUseCase = C.createUseCase(
	{ DocumentInFolderRepository },
	(
		{ documentInFolderRepository },
	) => (input: Input) => asyncPipe(
		documentInFolderRepository.findOne({
			documentFolder: input.ownerDocumentFolder,
			nodeSameRawDocumentId: input.nodeSameRawDocumentId,
		}),
		E.whenIsRight(
			innerPipe(
				DocumentInFolder.WithCheckedOwner.append,
				E.success,
			),
		),
	),
);
