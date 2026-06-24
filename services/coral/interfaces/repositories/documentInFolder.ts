import { A, C, escapeRegExp, toNative, unwrap, unwrapGroup } from "@duplojs/utils";
import { DocumentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { mongo } from "@interfaces/providers/mongo";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";

export const documentInFolderRepository = DocumentInFolderRepository.createImplementation({
	async findMany(params) {
		const { partialDocumentInFolderName, documentFolder, page, quantityPerPage } = unwrapGroup(params);

		return mongo.documentInFolder
			.find(
				{
					documentFolderId: unwrap(documentFolder.id),
					name: {
						$regex: escapeRegExp(partialDocumentInFolderName),
						$options: "i",
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.toArray()
			.then(
				A.map(DocumentInFolder.Entity.mapOrThrow),
			);
	},
	async countResultOfFindMany(params) {
		const { partialDocumentInFolderName, documentFolder } = unwrapGroup(params);

		return mongo.documentInFolder
			.countDocuments(
				{
					documentFolderId: unwrap(documentFolder.id),
					name: {
						$regex: escapeRegExp(partialDocumentInFolderName),
						$options: "i",
					},
				},
			)
			.then(
				C.Int.createOrThrow,
			);
	},
	async findOne(params) {
		const result = await mongo.documentInFolder.findOne({
			documentFolderId: unwrap(params.documentFolder.id),
			nodeSameRawDocumentId: unwrap(params.nodeSameRawDocumentId),
		});

		if (!result) {
			return C.none("documentInFolder");
		}

		return C.some(DocumentInFolder.Entity.mapOrThrow(result));
	},
	async remove(entity) {
		await mongo.documentInFolder.deleteOne({
			nodeSameRawDocumentId: unwrap(entity.nodeSameRawDocumentId),
		});
	},
	async deleteAllByUserId(userId) {
		await mongo.documentInFolder.deleteMany(
			{
				userId: unwrap(userId),
			},
		);
	},
	async save(entity) {
		const simpleEntity = C.unwrapEntity(entity, { transformer: toNative });

		await mongo.documentInFolder.updateOne(
			{
				documentFolderId: simpleEntity.documentFolderId,
				nodeSameRawDocumentId: simpleEntity.nodeSameRawDocumentId,
			},
			{
				$set: {
					...simpleEntity,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return entity;
	},
	async nodeSameRawDocumentIdsHaveDocumentInFolder(params) {
		const { userId, nodeSameRawDocumentIds } = unwrapGroup(params);
		return mongo.documentInFolder
			.aggregate<{ _id: string }>([
				{
					$match: {
						userId,
						nodeSameRawDocumentId: {
							$in: nodeSameRawDocumentIds,
						},
					},
				},
				{
					$group: {
						_id: "$nodeSameRawDocumentId",
					},
				},
			])
			.toArray()
			.then(
				A.map(NodeSameRawDocumentId.createOrThrow),
			);
	},
});
