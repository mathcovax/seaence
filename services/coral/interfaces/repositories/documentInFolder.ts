import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";

const one = 1;
const maxKeywordsInSummary = 30;

function limitSummaryLength(summary: string, maxWords: number): string {
	const words = summary.trim().split(/\s+/);
	const start = 0;

	if (words.length <= maxWords) {
		return summary;
	}

	return `${words.slice(start, maxWords).join(" ")}...`;
}

documentInFolderRepository.default = {
	async save(documentInFolderEntity) {
		const simpledocumentInFolder = documentInFolderEntity.toSimpleObject();

		await mongo.documentInFolder.updateOne(
			{
				id: simpledocumentInFolder.id,
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
	async searchDocumentInFolderPerPageWhereTitleIs(input) {
		const { documentFolder, documentTitle, quantityPerPage, page } = input;
		const { id } = documentFolder.toSimpleObject();

		const mongoDocumentsInFolder = await mongo.documentInFolder
			.find(
				{
					documentFolderId: id,
					title: {
						$regex: documentTitle.value,
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
	async getDetailsOfSearchDocumentInFolder(input) {
		const { documentFolder, documentTitle } = input;
		const { id } = documentFolder.toSimpleObject();

		const numberOfDocumentsInFolder = await mongo.documentInFolder
			.countDocuments(
				{
					documentFolderId: id,
					title: {
						$regex: documentTitle.value,
						$options: "i",
					},
				},
			)
			.then(
				(numberOfDocumentsInFolder) => intObjecter.unsafeCreate(numberOfDocumentsInFolder),
			);

		return {
			numberOfDocumentsInFolder,
		};
	},
};
