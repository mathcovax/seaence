import { v7 as uuidv7 } from "uuid";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { mongo, type RawDocumentMongoEntity } from "@interfaces/providers/mongo";
// repositories
import { type RawDocumentEntity, rawDocumentRepository } from "@business/applications/repositories/rawDocument";
// types
import { type DateInterval } from "@business/domains/types/common";
import { documentIdObjecter, type DocumentId } from "@business/domains/types/raw/document";
// entities
import { PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
import { PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
import { ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";

function mapMongoDocumentToEntity(rawDocumentMongo: RawDocumentMongoEntity) {
	if (rawDocumentMongo === null) {
		return null;
	} else if (rawDocumentMongo.source === "Pedro") {
		return EntityHandler.unsafeMapper(
			PedroRawDocumentEntity,
			rawDocumentMongo,
		);
	} else if (rawDocumentMongo.source === "Pubmed") {
		return EntityHandler.unsafeMapper(
			PubmedRawDocumentEntity,
			rawDocumentMongo,
		);
	} else if (rawDocumentMongo.source === "ScienceDirect") {
		return EntityHandler.unsafeMapper(
			ScienceDirectRawDocumentEntity,
			rawDocumentMongo,
		);
	}
	return null;
}

rawDocumentRepository.default = {
	async save(rawDocument) {
		const insertDocument = rawDocument.toSimpleObject();

		if (rawDocument instanceof PedroRawDocumentEntity) {
			await mongo.rawDocumentEntity.insertOne({
				...(rawDocument.toSimpleObject()),
				source: "Pedro",
			});
		} else if (rawDocument instanceof PubmedRawDocumentEntity) {
			await mongo.rawDocumentEntity.insertOne({
				...(rawDocument.toSimpleObject()),
				source: "Pubmed",
			});
		} else if (rawDocument instanceof ScienceDirectRawDocumentEntity) {
			await mongo.rawDocumentEntity.insertOne({
				...insertDocument,
				source: "ScienceDirect",
			});
		} else {
			throw new RepositoryError("unsupported-source-type");
		}

		return rawDocument;
	},
	async findByDateInterval(dateInterval: DateInterval) {
		return dateInterval as unknown as Promise<RawDocumentEntity[]>;
	},
	async findByDocumentId(documentId: DocumentId) {
		const rawDocumentMongo = await mongo.rawDocumentEntity.findOne(
			{ id: documentId.value },
			{ projection: { _id: 0 } },
		);

		return rawDocumentMongo ? mapMongoDocumentToEntity(rawDocumentMongo) : null;
	},
	async findBySourceUrl(sourceUrl) {
		const rawDocumentMongo = await mongo.rawDocumentEntity.findOne(
			{ sourceUrl: sourceUrl.value },
			{ projection: { _id: 0 } },
		);

		return rawDocumentMongo ? mapMongoDocumentToEntity(rawDocumentMongo) : null;
	},
	generateRawDocumentId() {
		return documentIdObjecter.unsafeCreate(uuidv7());
	},
};

export {
	rawDocumentRepository,
};
