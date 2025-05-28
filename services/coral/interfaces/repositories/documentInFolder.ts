import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";

documentInFolderRepository.default = {
	async save(documentInFolderEntity) {
		const simpledocumentInFolder = documentInFolderEntity.toSimpleObject();

		const beforedocumentInFolder = await mongo.documentInFolder.findOne({
			id: simpledocumentInFolder.id,
			documentFolderId: simpledocumentInFolder.documentFolderId,
		});

		const createdAt = beforedocumentInFolder?.createdAt || new Date();

		await mongo.documentInFolder.updateOne(
			{
				id: simpledocumentInFolder.id,
			},
			{
				$set: {
					...simpledocumentInFolder,
					createdAt,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return documentInFolderEntity;
	},
	async delete(documentInFolderEntity) {
		const { id } = documentInFolderEntity.toSimpleObject();

		await mongo.documentInFolder.deleteOne({
			id,
		});
	},
	async findDocumentInFolder(documentFolderId, documentId) {
		const documentInFolder = await mongo.documentInFolder.findOne({
			documentFolderId,
			documentId,
		});

		if (!documentInFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentInFolderEntity,
			documentInFolder,
		);
	},
};
