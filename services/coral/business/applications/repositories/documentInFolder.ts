import { C } from "@duplojs/utils";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import type { DocumentFolder } from "@business/domains/entities/documentFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import type { UserId } from "@business/domains/common/user";

export const PartialDocumentInFolderNameConstraint = C.createConstraintsSet(
	C.String,
	[DocumentInFolder.Name.getConstraint("string-max-350")],
);
export type PartialDocumentInFolderNameConstraint = C.GetConstraints<
	typeof PartialDocumentInFolderNameConstraint
>;

export interface DocumentInFolderRepository {
	findMany(
		params: {
			documentFolder: DocumentFolder.Entity;
			partialDocumentInFolderName: PartialDocumentInFolderNameConstraint;
			page: C.Int;
			quantityPerPage: C.PositiveInt;
		}
	): Promise<DocumentInFolder.Entity[]>;
	findOne(
		params: {
			documentFolder: DocumentFolder.Entity;
			nodeSameRawDocumentId: NodeSameRawDocumentId;
		}
	): Promise<C.Maybe<DocumentInFolder.Entity>>;
	save(entity: DocumentInFolder.Entity): Promise<DocumentInFolder.Entity>;
	remove(entity: DocumentInFolder.Entity): Promise<void>;
	countResultOfFindMany(
		params: {
			documentFolder: DocumentFolder.Entity;
			partialDocumentInFolderName: PartialDocumentInFolderNameConstraint;
		},
	): Promise<C.Int>;
	deleteAllByUserId(userId: UserId): Promise<void>;
	nodeSameRawDocumentIdsHaveDocumentInFolder(
		params: {
			userId: UserId;
			nodeSameRawDocumentIds: NodeSameRawDocumentId[];
		}
	): Promise<NodeSameRawDocumentId[]>;
}

export const DocumentInFolderRepository = C.createRepository<
	DocumentInFolderRepository
>();
