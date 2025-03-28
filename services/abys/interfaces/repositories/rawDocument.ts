import { UsecaseError } from "@vendors/clean";
import { v7 as uuidv7 } from "uuid";
import { mongoClient } from "@interfaces/providers/mongo/client";
// repositories
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
// entities
import { PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
// types
import { type DateInterval } from "@business/domains/types/common";
import { documentIdObjecter, type DocumentId } from "@business/domains/types/raw/document";

rawDocumentRepository.default = {
	async save(rawDocument) {
		if (
			(rawDocument instanceof PedroRawDocumentEntity)
			|| (rawDocument instanceof PubmedRawDocumentEntity)
			|| (rawDocument instanceof ScienceDirectRawDocumentEntity)
		) {
			await mongoClient.upsert(
				"rawDocument",
				{
					id: rawDocument.id.value,
				},
				rawDocument.toSimpleObject(),
			);
		}

		return rawDocument;
	},
	async findByDateInterval(dateInterval: DateInterval) {
		const results = mongoClient.findMany(
			"rawDocument",
			{
				createdAt: {
					$gte: dateInterval.value.from,
					$lt: dateInterval.value.to,
				},
			},
		);

		return "todo" as unknown as Promise<PedroRawDocumentEntity[] | PubmedRawDocumentEntity[] | ScienceDirectRawDocumentEntity[]>;
	},
	async findByDocumentId(documentId: DocumentId) {
		const rawDocument = mongoClient.findOne(
			"rawDocument",
			{
				id: documentId.value,
			},
		);
		if (!rawDocument) {
			throw new UsecaseError("rawDocument.notfound", "rawDocument not found");
		}

		return "todo" as unknown as Promise<PedroRawDocumentEntity | PubmedRawDocumentEntity | ScienceDirectRawDocumentEntity>;
	},
	generateRawDocumentId() {
		return documentIdObjecter.unsafeCreate(uuidv7());
	},
};

export { rawDocumentRepository };
