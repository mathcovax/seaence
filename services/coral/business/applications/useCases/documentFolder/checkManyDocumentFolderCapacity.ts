import { C, A, innerPipe, E, when, asyncPipe } from "@duplojs/utils";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";
import { CheckDocumentFolderCapacityUseCase } from "./checkDocumentFolderCapacity";

interface Input<
	GenericDocumentFolder extends DocumentFolder.Entity,
> {
	documentFolders: readonly GenericDocumentFolder[];
}

export const CheckManyDocumentFolderCapacityUseCase = C.createUseCase(
	{
		CheckDocumentFolderCapacityUseCase,
	},
	(
		{ checkDocumentFolderCapacityUseCase },
	) => <
		GenericDocumentFolder extends DocumentFolder.Entity,
	>(input: Input<GenericDocumentFolder>) => asyncPipe(
		input.documentFolders,
		A.map(
			(documentFolder) => checkDocumentFolderCapacityUseCase(
				{ documentFolder },
			),
		),
		A.group(
			innerPipe(
				E.whenIsRight(
					A.groupOutput("ownerDocumentFoldersWithCapacity"),
				),
				when(
					E.isLeft,
					A.groupOutput("errors"),
				),
			),
		),
	),
);
