import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { escapeRegExp } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";

const one = 1;

documentInFolderRepository.default = {
	async save(documentInFolderEntity) {
		const simpledocumentInFolder = documentInFolderEntity.toSimpleObject();

		await mongo.documentInFolder.updateOne(
			{
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
		const { nodeSameRawDocumentId } = documentInFolderEntity.toSimpleObject();

		await mongo.documentInFolder.deleteOne({
			nodeSameRawDocumentId,
		});
	},
	async findDocumentInFolder(documentFolderId, nodeSameRawNodeSameRawDocumentId) {
		const documentInFolder = await mongo.documentInFolder.findOne({
			documentFolderId,
			nodeSameRawNodeSameRawDocumentId,
		});

		if (!documentInFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentInFolderEntity,
			documentInFolder,
		);
	},
	async findDocuments(input) {
		const { documentFolder, documentInFolderName, quantityPerPage, page } = input;
		const { id } = documentFolder.toSimpleObject();

		const mongoDocumentsInFolder = await mongo.documentInFolder
			.find(
				{
					documentFolderId: id,
					name: {
						$regex: escapeRegExp(documentInFolderName.value),
						$options: "i",
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip((page.value - one) * quantityPerPage.value)
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
	async countResultOfFindDocumentInFolder(input) {
		const { documentFolder, documentInFolderName } = input;
		const { id } = documentFolder.toSimpleObject();

		const numberOfDocumentsInFolder = await mongo.documentInFolder
			.countDocuments(
				{
					documentFolderId: id,
					name: {
						$regex: escapeRegExp(documentInFolderName.value),
						$options: "i",
					},
				},
			)
			.then(
				(numberOfDocumentsInFolder) => intObjecter.unsafeCreate(numberOfDocumentsInFolder),
			);

		return numberOfDocumentsInFolder;
	},
};
