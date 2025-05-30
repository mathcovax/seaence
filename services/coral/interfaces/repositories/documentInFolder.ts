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

		const beforedocumentInFolder = await mongo.documentInFolder.findOne({
			id: simpledocumentInFolder.id,
			documentFolderId: simpledocumentInFolder.documentFolderId,
		});

		const createdAt = beforedocumentInFolder?.createdAt || new Date();

		const summary = limitSummaryLength(simpledocumentInFolder.summary, maxKeywordsInSummary);

		await mongo.documentInFolder.updateOne(
			{
				id: simpledocumentInFolder.id,
			},
			{
				$set: {
					...simpledocumentInFolder,
					summary,
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
	async searchDocumentInFolderPerPageWhereTitleIs(input) {
		const { documentFolder, documentTitle, quantityPerPage, page } = input;
		const simpleDocumentFolder = documentFolder.toSimpleObject();

		const query = {
			documentFolderId: simpleDocumentFolder.id,
			title: {
				$regex: documentTitle.value,
				$options: "i",
			},
		};

		const numberOfDocumentInFolder = await mongo.documentInFolder
			.countDocuments(query)
			.then(
				(numberOfDocumentInFolder) => intObjecter.unsafeCreate(numberOfDocumentInFolder),
			);

		const mongoDocumentsInFolder = await mongo.documentInFolder
			.find(query)
			.skip((page.value - one) * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const documentsInFolder = mongoDocumentsInFolder.map(
			(mongoDocumentInFolder) => EntityHandler.unsafeMapper(
				DocumentInFolderEntity,
				mongoDocumentInFolder,
			),
		);

		return {
			numberOfDocumentInFolder,
			documentsInFolder,
		};
	},
};
