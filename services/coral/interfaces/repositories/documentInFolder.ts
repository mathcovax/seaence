import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolderEntity, nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";
import { escapeRegExp } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter, toSimpleObject } from "@vendors/clean";

documentInFolderRepository.default = {
	async save(documentInFolderEntity) {
		const simpledocumentInFolder = documentInFolderEntity.toSimpleObject();

		await mongo.documentInFolder.updateOne(
			{
				documentFolderId: simpledocumentInFolder.documentFolderId,
				nodeSameRawDocumentId: simpledocumentInFolder.nodeSameRawDocumentId,
			},
			{
				$set: {
					...simpledocumentInFolder,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return documentInFolderEntity;
	},
	async delete(documentInFolderEntity) {
		await mongo.documentInFolder.deleteOne({
			nodeSameRawDocumentId: documentInFolderEntity.nodeSameRawDocumentId.value,
		});
	},
	async findDocumentInFolder(documentFolderId, nodeSameRawDocumentId) {
		const documentInFolder = await mongo.documentInFolder.findOne({
			documentFolderId: documentFolderId.value,
			nodeSameRawDocumentId: nodeSameRawDocumentId.value,
		});

		if (!documentInFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentInFolderEntity,
			documentInFolder,
		);
	},
	async searchDocuments(input) {
		const { documentFolder, partialDocumentInFolderName, quantityPerPage, page } = input;

		const mongoDocumentsInFolder = await mongo.documentInFolder
			.find(
				{
					documentFolderId: documentFolder.id.value,
					name: {
						$regex: escapeRegExp(partialDocumentInFolderName.value),
						$options: "i",
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const documentsInFolder = mongoDocumentsInFolder.map(
			(mongoDocumentInFolder) => EntityHandler.unsafeMapper(
				DocumentInFolderEntity,
				mongoDocumentInFolder,
			),
		);

		return documentsInFolder;
	},
	async countResultOfSearchDocumentInFolder(documentFolder, partialDocumentInFolderName) {
		const numberOfDocumentsInFolder = await mongo.documentInFolder
			.countDocuments(
				{
					documentFolderId: documentFolder.id.value,
					name: partialDocumentInFolderName
						? {
							$regex: escapeRegExp(partialDocumentInFolderName.value),
							$options: "i",
						}
						: undefined,
				},
			)
			.then(
				(numberOfDocumentsInFolder) => intObjecter.unsafeCreate(numberOfDocumentsInFolder),
			);

		return numberOfDocumentsInFolder;
	},
	nodeSameRawDocumentIdsHaveDocumentInFolder(userId, nodeSameRawDocumentIds) {
		return mongo.documentInFolder
			.aggregate<{ _id: string }>([
				{
					$match: {
						userId: userId.value,
						nodeSameRawDocumentId: {
							$in: toSimpleObject(nodeSameRawDocumentIds),
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
				(result) => result
					.map(
						({ _id }) => nodeSameRawDocumentIdObjecter.unsafeCreate(_id),
					),
			);
	},
	async deleteAllByUserId(userId) {
		await mongo.documentInFolder.deleteMany(
			{
				userId: userId.value,
			},
		);
	},
};
