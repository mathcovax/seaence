import { v7 as uuidv7 } from "uuid";
import { mongo } from "@interfaces/providers/mongo/client";
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
		const insertValue = rawDocument.toSimpleObject();
		if (rawDocument instanceof PedroRawDocumentEntity) {
			await mongo.pedroEntity.insertOne({
				...insertValue,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} else if (rawDocument instanceof PubmedRawDocumentEntity) {
			await mongo.pubmedEntity.insertOne({
				...insertValue,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} else if (rawDocument instanceof ScienceDirectRawDocumentEntity) {
			await mongo.scienceDirectEntity.insertOne({
				...insertValue,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return rawDocument;
	},
	async findByDateInterval(dateInterval: DateInterval) {
		return "todo" as unknown as Promise<PedroRawDocumentEntity[] | PubmedRawDocumentEntity[] | ScienceDirectRawDocumentEntity[]>;
	},
	async findByDocumentId(documentId: DocumentId) {
		return "todo" as unknown as Promise<PedroRawDocumentEntity | PubmedRawDocumentEntity | ScienceDirectRawDocumentEntity>;
	},
	generateRawDocumentId() {
		return documentIdObjecter.unsafeCreate(uuidv7());
	},
};

export { rawDocumentRepository };
