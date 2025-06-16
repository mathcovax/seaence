import { documentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolderEntity, documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { escapeRegExp } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

documentFolderRepository.default = {
	generateDocumentFolderId() {
		return documentFolderIdObjecter.unsafeCreate(uuidv7());
	},
	async save(documentFolderEntity) {
		const simpleDocumentFolder = documentFolderEntity.toSimpleObject();

		await mongo.documentFolder.updateOne(
			{
				id: simpleDocumentFolder.id,
			},
			{
				$set: {
					...simpleDocumentFolder,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return documentFolderEntity;
	},
	async delete(documentFolderEntity) {
		await mongo.documentInFolder.deleteMany({
			documentFolderId: documentFolderEntity.id.value,
		});

		await mongo.documentFolder.deleteOne({
			id: documentFolderEntity.id.value,
		});
	},

	async countDocumentsInFolder(documentFolderEntity) {
		const documentInFolderCount = await mongo.documentInFolder.countDocuments({
			documentFolderId: documentFolderEntity.id.value,
		});

		return intObjecter.unsafeCreate(documentInFolderCount);
	},
	async findDocumentFolder(userId, documentFolderName) {
		const documentFolder = await mongo.documentFolder.findOne({
			userId: userId.value,
			name: documentFolderName.value,
		});

		if (!documentFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentFolderEntity,
			documentFolder,
		);
	},
	async findDocumentFolderById(documentFolderId) {
		const documentFolder = await mongo.documentFolder.findOne({
			id: documentFolderId.value,
		});

		if (!documentFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentFolderEntity,
			documentFolder,
		);
	},
	async searchDocumentFolders(input) {
		const { userId, partialDocumentFolderName, page, quantityPerPage } = input;

		const mongoDocumentFolders = await mongo.documentFolder
			.find(
				{
					userId: userId.value,
					name: {
						$regex: escapeRegExp(partialDocumentFolderName.value),
					},
				},
			)
			.sort({ createdAt: -1 })
			.skip((page.value) * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const documentFolders = mongoDocumentFolders.map(
			(mongoDocumentFolder) => EntityHandler.unsafeMapper(
				DocumentFolderEntity,
				mongoDocumentFolder,
			),
		);

		return documentFolders;
	},
	async countResultOfSearchDocumentFolder(userId, documentFolderName) {
		const numberOfDocumentFolders = await mongo.documentFolder
			.countDocuments(
				{
					userId: userId.value,
					name: documentFolderName
						? {
							$regex: escapeRegExp(documentFolderName.value),
						}
						: undefined,
				},
			)
			.then(
				(numberOfDocumentFolders) => intObjecter.unsafeCreate(numberOfDocumentFolders),
			);

		return numberOfDocumentFolders;
	},
};
