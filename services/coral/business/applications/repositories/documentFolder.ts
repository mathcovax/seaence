import { C } from "@duplojs/utils";
import type { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import type { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { type DocumentInFolder } from "@business/domains/entities/documentInFolder";

export const PartialDocumentFolderNameConstraint = C.createConstraintsSet(
	C.String,
	[DocumentFolder.Name.getConstraint("string-max-350")],
);
export type PartialDocumentFolderNameConstraint = C.GetConstraints<
	typeof PartialDocumentFolderNameConstraint
>;

export interface DocumentFolderRepository {
	generateId(): DocumentFolder.Id;
	save(entity: DocumentFolder.Entity): Promise<DocumentFolder.Entity>;
	findByName(
		params: {
			userId: UserId;
			documentFolderName: DocumentFolder.Name;
		}
	): Promise<C.Maybe<DocumentFolder.Entity>>;
	getQuantityOfOwner(userId: UserId): Promise<C.PositiveInt>;
	remove(entity: DocumentFolder.Entity): Promise<void>;
	findOneById(
		id: DocumentFolder.Id
	): Promise<C.Maybe<DocumentFolder.Entity>>;
	findMany(
		params: {
			userId: UserId;
			partialDocumentFolderName: PartialDocumentFolderNameConstraint;
			page: C.Int;
			quantityPerPage: C.PositiveInt;
		},
	): Promise<DocumentFolder.Entity[]>;
	countResultOfFindMany(
		params: {
			userId: UserId;
			partialDocumentFolderName: PartialDocumentFolderNameConstraint;
		},
	): Promise<C.Int>;
	countDocumentInFolder(entity: DocumentFolder.Entity): Promise<C.Int>;
	findManyByNodeSameRawDocument(
		params: {
			userId: UserId;
			partialDocumentFolderName: PartialDocumentFolderNameConstraint;
			nodeSameRawDocumentId: NodeSameRawDocumentId;
			quantityPerPage: C.PositiveInt;
			page: C.Int;
		}
	): Promise<DocumentFolder.Entity[]>;
	countResultOfFindManyByNodeSameRawDocument(
		params: {
			userId: UserId;
			partialDocumentFolderName: PartialDocumentFolderNameConstraint;
			nodeSameRawDocumentId: NodeSameRawDocumentId;
		}
	): Promise<C.Int>;
	getByDocumentInFolder(
		documentInFolder: DocumentInFolder.Entity
	): Promise<DocumentFolder.Entity>;
	deleteAllByUserId(userId: UserId): Promise<void>;
}

export const DocumentFolderRepository = C.createRepository<DocumentFolderRepository>();
