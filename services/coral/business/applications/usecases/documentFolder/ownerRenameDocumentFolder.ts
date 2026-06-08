import { asyncPipe, C, E, P, pipe } from "@duplojs/utils";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolder } from "@business/domains/entities/documentFolder";

interface Input {
	ownerDocumentFolder: DocumentFolder.Entity & DocumentFolder.WithCheckedOwner;
	newDocumentFolderName: DocumentFolder.Name;
}

export const OwnerRenameDocumentFolderUseCase = C.createUseCase(
	{ DocumentFolderRepository },
	(
		{ documentFolderRepository },
	) => (input: Input) => asyncPipe(
		documentFolderRepository.findByName({
			userId: input.ownerDocumentFolder.userId,
			documentFolderName: input.newDocumentFolderName,
		}),
		P.when(
			E.isRight,
			() => pipe(
				DocumentFolder.rename(
					input.ownerDocumentFolder,
					input.newDocumentFolderName,
				),
				documentFolderRepository.save,
				E.success,
			),
		),
		P.when(
			E.isLeft,
			() => E.left("document-folder-already-exist"),
		),
		P.exhaustive,
	),
);
