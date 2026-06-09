import { A, C, E, asyncPipe, unwrap, when } from "@duplojs/utils";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { type DocumentFolder } from "@business/domains/entities/documentFolder";
import { ComputeDocumentQuantityInFolderUseCase } from "../documentFolder";
import { DocumentFolderRepository } from "@business/applications/repositories/documentFolder";

interface Input {
	ownerDocumentFoldersWithCapacity: readonly (
		& DocumentFolder.Entity
		& DocumentFolder.WithCheckedCapacity
		& DocumentFolder.WithCheckedOwner
	)[];
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	documentInFolderName: DocumentInFolder.Name;
}

export const OwnerCreateDocumentInManyFolderUseCase = C.createUseCase(
	{
		DocumentInFolderRepository,
		DocumentFolderRepository,
		ComputeDocumentQuantityInFolderUseCase,
	},
	(
		{
			documentInFolderRepository,
			computeDocumentQuantityInFolderUseCase,
		},
	) => (input: Input) => asyncPipe(
		input.ownerDocumentFoldersWithCapacity,
		A.map(
			(ownerDocumentFolder) => asyncPipe(
				ownerDocumentFolder,
				(documentFolder) => documentInFolderRepository.findOne({
					documentFolder,
					nodeSameRawDocumentId: input.nodeSameRawDocumentId,
				}),
				when(
					E.isRight,
					unwrap,
				),
				E.whenIsLeft(
					async() => {
						const documentInFolder = DocumentInFolder.create({
							name: input.documentInFolderName,
							nodeSameRawDocumentId: input.nodeSameRawDocumentId,
							documentFolderId: ownerDocumentFolder.id,
							userId: ownerDocumentFolder.userId,
						});

						await documentInFolderRepository.save(documentInFolder);

						await computeDocumentQuantityInFolderUseCase({ documentFolder: ownerDocumentFolder });

						return documentInFolder;
					},
				),
			),
		),
		(promises) => Promise.all(promises),
	),
);
