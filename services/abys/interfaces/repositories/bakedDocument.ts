import { uuidv7 } from "uuidv7";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type BakedDocumentAbstractDetails, bakedDocumentAbstractObjecter, BakedDocumentEntity, bakedDocumentIdObjecter, bakedDocumentKeywordObjecter, bakedDocumentTitleObjecter, type BakedDocumentLanguage, bakedDocumentAbstractDetailsObjecter } from "@business/domains/entities/bakedDocument";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { RosettaAPI, type SupportedLanguage } from "@interfaces/providers/rosetta";
import { KeyDate } from "@interfaces/providers/keyDate";

const languageMapper: Record<BakedDocumentLanguage["value"], SupportedLanguage> = {
	"fr-FR": "fr",
	"en-US": "en",
};

bakedDocumentRepository.default = {
	generateBakedDocumentId() {
		return bakedDocumentIdObjecter.unsafeCreate(uuidv7());
	},
	async save(bakedDocument) {
		const simpleBakedDocument = bakedDocument.toSimpleObject();

		const beforeBakedDocument = await mongo.bakedDocumentCollection.findOne({
			id: simpleBakedDocument.id,
		});

		const createdAt = beforeBakedDocument?.createdAt ?? new Date();

		await mongo.bakedDocumentCollection.updateOne(
			{
				id: simpleBakedDocument.id,
			},
			{
				$set: {
					...simpleBakedDocument,
					createdAt,
					updatedAt: new Date(),
				},
			},
			{ upsert: true },
		);

		return bakedDocument;
	},
	async findByNodeSameRawDocument(nodeSameRawDocument) {
		const bakedDocumentMongo = await mongo.bakedDocumentCollection.findOne(
			{
				nodeSameRawDocumentId: nodeSameRawDocument.id.value,
			},
			{ projection: { _id: 0 } },
		);

		return bakedDocumentMongo
			? EntityHandler.unsafeMapper(
				BakedDocumentEntity,
				bakedDocumentMongo,
			)
			: null;
	},
	async makeBakedTitleWithRawTitle(rawTitle, language) {
		const title = await RosettaAPI.translateText(
			rawTitle.value,
			languageMapper[language.value],
		);

		return bakedDocumentTitleObjecter.unsafeCreate(title);
	},
	async makeBakedKeywordsWithKeywordPubmed(rawKeywordPubmeds, language) {
		const rawKeywordList = rawKeywordPubmeds
			.map((rawKeywordPubmed) => rawKeywordPubmed.value.value)
			.join("\n");

		const listKeywordProcesses = await RosettaAPI
			.translateText(
				rawKeywordList,
				languageMapper[language.value],
			)
			.then(
				(result) => result.split("\n").map((value) => value.trim()),
			)
			.then(
				(result) => new Set(result).values().toArray(),
			);

		return listKeywordProcesses.map((keyword) => bakedDocumentKeywordObjecter.unsafeCreate({
			value: keyword,
		}));
	},
	async makeBakedAbstractWithRawAbstract(rawAbstract, language) {
		const abstract = await RosettaAPI.translateText(
			rawAbstract.value,
			languageMapper[language.value],
		);

		return bakedDocumentAbstractObjecter.unsafeCreate(abstract);
	},
	async makeBakedAbstractDetailsWithRawAbstractDetails(rawAbstractDetails, language) {
		const rawAbstractDetailsProcesses = await rawAbstractDetails.reduce<
			Promise<BakedDocumentAbstractDetails["value"]>
		>(
			async(promiseAcc, { value }) => {
				const acc = await promiseAcc;
				const { name, content } = value;

				const contentProcess = await RosettaAPI.translateText(
					content,
					languageMapper[language.value],
				);

				return {
					...acc,
					[name]: contentProcess,
				};
			},
			Promise.resolve({}),
		);

		return bakedDocumentAbstractDetailsObjecter.unsafeCreate(rawAbstractDetailsProcesses);
	},
	async *findUpdatedDocuments() {
		const startPage = 0;
		const quantityPerPage = 10;

		const lastSend = await KeyDate.get("lastSendBakedDocument");
		await KeyDate.set("lastSendBakedDocument");

		for (let page = startPage; true; page++) {
			const bakedDocuments = await mongo
				.bakedDocumentCollection
				.find(
					{
						$or: [
							{
								lastUpdate: {
									$gt: lastSend,
								},
							},
						],
					},
					{ projection: { _id: 0 } },
				)
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!bakedDocuments.length) {
				break;
			}

			for (const nodeNameRawDocument of bakedDocuments) {
				yield EntityHandler.unsafeMapper(
					BakedDocumentEntity,
					nodeNameRawDocument,
				);
			}
		}
	},
};
