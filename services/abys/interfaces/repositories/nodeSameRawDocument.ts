import { uuidv7 } from "uuidv7";
import { match, P } from "ts-pattern";
import { mongo } from "@interfaces/providers/mongo";
import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { NodeSameRawDocumentEntity, nodeSameRawDocumentIdObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { EntityHandler } from "@vendors/clean";
import { KeyDate } from "@interfaces/providers/keyDate";

nodeSameRawDocumentRepository.default = {
	generateNodeSameRawDocumentId() {
		return nodeSameRawDocumentIdObjecter.unsafeCreate(uuidv7());
	},
	async findNodeSameRawDocumentbyRawDocument(rawDocument) {
		const nodeSameRawDocumentMongo = await match({ rawDocument })
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				() => mongo.nodeNameRawDocumentCollection.findOne(
					{
						rawDocumentWrapper: {
							pubmed: rawDocument.resourceUrl.value,
						},
					},
					{ projection: { _id: 0 } },
				),
			).exhaustive();

		return nodeSameRawDocumentMongo
			? EntityHandler.unsafeMapper(
				NodeSameRawDocumentEntity,
				nodeSameRawDocumentMongo,
			)
			: null;
	},
	async save(nodeSameRawDocument) {
		const simpleNodeSameRawDocument = nodeSameRawDocument.toSimpleObject();

		await mongo.nodeNameRawDocumentCollection.updateOne(
			{
				id: simpleNodeSameRawDocument.id,
			},
			{
				$set: {
					...simpleNodeSameRawDocument,
				},
			},
			{ upsert: true },
		);

		return nodeSameRawDocument;
	},
	async findNodeSameRawDocumentPerPage({ quantityPerPage, page }) {
		return mongo.nodeNameRawDocumentCollection
			.find(
				{},
				{ projection: { _id: 0 } },
			)
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.map(
				(mongoNodeSameRawDocument) => EntityHandler.unsafeMapper(
					NodeSameRawDocumentEntity,
					mongoNodeSameRawDocument,
				),
			)
			.toArray();
	},
	async *findUpdatedNode() {
		const startPage = 0;
		const quantityPerPage = 10;

		const lastCook = await KeyDate.get("lastCookNodeSameRawDocument");
		await KeyDate.set("lastCookNodeSameRawDocument");

		for (let page = startPage; true; page++) {
			const nodeNameRawDocuments = await mongo
				.nodeNameRawDocumentCollection
				.find(
					{
						$or: [
							{ lastCooked: null },
							{
								lastUpdate: {
									$gt: lastCook,
								},
							},
						],
					},
					{ projection: { _id: 0 } },
				)
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!nodeNameRawDocuments.length) {
				break;
			}

			for (const nodeNameRawDocument of nodeNameRawDocuments) {
				yield EntityHandler.unsafeMapper(
					NodeSameRawDocumentEntity,
					nodeNameRawDocument,
				);
			}
		}
	},
};
