import { documentFolderRepository } from "@business/applications/repositories/documentFolder";
import { DocumentFolderEntity, documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { escapeRegExp } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

const one = 1;

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
	async findDocumentFolderById(documentFolderId) {
		const documentFolder = await mongo.documentFolder.findOne({
			id: documentFolderId,
		});

		if (!documentFolder) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			DocumentFolderEntity,
			documentFolder,
		);
	},
	async findDocumentFolders(input) {
		const { userId, documentFolderName, page, quantityPerPage } = input;

		const mongoDocumentFolders = await mongo.documentFolder
			.find(
				{
					userId: userId.value,
					title: {
						$regex: escapeRegExp(documentFolderName.value),
						$options: "i",
					},
				},
			)
			.sort({ createdAt: -1 })
			.skip((page.value - one) * quantityPerPage.value)
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
	async countResultOfFindDocumentFolder(input) {
		const { userId, documentFolderName } = input;

		const numberOfDocumentFolders = await mongo.documentFolder
			.countDocuments(
				{
					userId: userId.value,
					title: {
						$regex: escapeRegExp(documentFolderName.value),
						$options: "i",
					},
				},
			).then(
				(numberOfDocumentFolders) => intObjecter.unsafeCreate(numberOfDocumentFolders),
			);

		return numberOfDocumentFolders;
	},
};
