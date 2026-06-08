import { asyncPipe, C, E } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import type { UserId } from "@business/domains/common/user";

interface Input {
	documentFolderId: DocumentFolder.Id;
	userId: UserId;
}

export const OwnerFindDocumentFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => asyncPipe(
		documentFolderRepository.findOneById(
			input.documentFolderId,
		),
		E.whenIsRight(
			(documentFolder) => C.equal(documentFolder.userId, input.userId)
				? E.success(
					DocumentFolder.WithCheckedOwner.append(documentFolder),
				)
				: E.left("wrong-proprietary", documentFolder),
		),
	),
);
