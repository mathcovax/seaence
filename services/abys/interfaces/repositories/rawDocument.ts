import { EntityHandler, RepositoryError } from "@vendors/clean";
import { rawDocumentRepository, type ResultOfFindByNodeSameRawDocument } from "@business/applications/repositories/rawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { mongo } from "@interfaces/providers/mongo";
import { type MongoRawDocument } from "@interfaces/providers/mongo/entities/rawDocument";
import { match } from "ts-pattern";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { providerEnum } from "@business/domains/common/provider";
import { rawResourceUrlObjecter } from "@business/domains/common/rawDocument";

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
	findUniqueField(rawDocument) {
		for (const articleId of rawDocument.articleIds) {
			if (articleId.value.type === "doi") {
				return uniqueFieldObjecter.unsafeCreate({
					name: "DOI",
					value: articleId.value.value,
				});
			} else if (articleId.value.type === "bookid") {
				return uniqueFieldObjecter.unsafeCreate({
					name: "BOOKID",
					value: articleId.value.value,
				});
			}
		}

		throw new RepositoryError("no-valid-unique-id");
	},
	async findByNodeSameRawDocument(nodeSameRawDocument) {
		const resourcesKey = providerEnum.toTuple();
		const result: ResultOfFindByNodeSameRawDocument = {};

		for (const resource of resourcesKey) {
			if (nodeSameRawDocument.rawDocumentWrapper.value[resource]) {
				const resourceUrl = nodeSameRawDocument.rawDocumentWrapper.value[resource];
				const rawDocument = await this.findByResourceUrl(
					rawResourceUrlObjecter.unsafeCreate(resourceUrl),
				);
				result[resource] = rawDocument ? rawDocument : undefined;
			}
		}

		return result;
	},
};
