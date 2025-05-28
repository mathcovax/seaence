import { documentFolderRepository } from "@business/applications/repositories/documentFolder";
import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { mongo } from "@interfaces/providers/mongo";
import { intObjecter } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

documentFolderRepository.default = {
	generateDocumentFolderId() {
		return documentFolderIdObjecter.unsafeCreate(uuidv7());
	},
	async save(documentFolderEntity) {
		const simpleDocumentFolder = documentFolderEntity.toSimpleObject();

		const beforeDocumentFolder = await mongo.documentFolder.findOne({
			id: simpleDocumentFolder.id,
		});

		const createdAt = beforeDocumentFolder?.createdAt ?? new Date();

		await mongo.documentFolder.updateOne(
			{
				id: simpleDocumentFolder.id,
			},
			{
				$set: {
					...simpleDocumentFolder,
					createdAt,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return documentFolderEntity;
	},
	async delete(documentFolderEntity) {
		const { id } = documentFolderEntity.toSimpleObject();

		await mongo.documentInFolder.deleteMany({
			documentFolderId: id,
		});

		await mongo.documentFolder.deleteOne({
			id,
		});
	},

	async countDocumentsInFolder(documentFolderEntity) {
		const { id } = documentFolderEntity.toSimpleObject();

		const documentInFolderCount = await mongo.documentInFolder.countDocuments({
			documentFolderId: id,
		});

		return intObjecter.unsafeCreate(documentInFolderCount);
	},
};
