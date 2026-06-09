import { C, E, A, asyncPipe, innerPipe, when } from "@duplojs/utils";
import type { UserId } from "@business/domains/common/user";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";
import { OwnerFindDocumentFolderUseCase } from "./ownerFindDocumentFolderById";

interface Input {
	userId: UserId;
	documentFolderIds: DocumentFolder.Id[];
}

export const OwnerFindManyDocumentFolderUseCase = C.createUseCase(
	{
		OwnerFindDocumentFolderUseCase,
	},
	(
		{ ownerFindDocumentFolderUseCase },
	) => (input: Input) => asyncPipe(
		input.documentFolderIds,
		A.map(
			(documentFolderId) => ownerFindDocumentFolderUseCase({
				documentFolderId,
				userId: input.userId,
			})
				.then(
					E.whenHasInformation(
						"none-documentFolder",
						() => E.left("notfound-documentFolder", documentFolderId),
					),
				),
		),
		(promises) => Promise.all(promises),
		A.group(
			innerPipe(
				when(
					E.isLeft,
					A.groupOutput("errors"),
				),
				E.whenIsRight(
					A.groupOutput("ownerDocumentFolders"),
				),
			),
		),
	),
);
