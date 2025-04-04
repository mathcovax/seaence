import { EntityHandler, RepositoryError } from "@vendors/clean";
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { mongo } from "@interfaces/providers/mongo";
import { type MongoRawDocument } from "@interfaces/providers/mongo/entities/rawDocument";
import { match } from "ts-pattern";

function mapMongoDocumentToEntity(mongoRawDocument: MongoRawDocument) {
	return match(mongoRawDocument)
		.with(
			{ provider: "pubmed" },
			(mongoRawDocument) => EntityHandler.unsafeMapper(
				PubmedRawDocumentEntity,
				mongoRawDocument,
			),
		)
		.exhaustive();
}

rawDocumentRepository.default = {
	async save(rawDocument) {
		if (rawDocument instanceof PubmedRawDocumentEntity) {
			const simpleRawDocument = rawDocument.toSimpleObject();

			await mongo.rawDocumentCollection.updateOne(
				{
					resourceUrl: simpleRawDocument.resourceUrl,
				},
				{
					$set: {
						provider: "pubmed",
						...simpleRawDocument,
					},
				},
				{ upsert: true },
			);
		} else {
			throw new RepositoryError("unsupported-source-type");
		}

		return rawDocument;
	},
	async findByResourceUrl(resourceUrl) {
		const rawDocumentMongo = await mongo.rawDocumentCollection.findOne(
			{ resourceUrl: resourceUrl.value },
			{ projection: { _id: 0 } },
		);

		return rawDocumentMongo ? mapMongoDocumentToEntity(rawDocumentMongo) : null;
	},
};
