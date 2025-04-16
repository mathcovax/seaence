import { uuidv7 } from "uuidv7";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type BakedDocumentAbstractDetails, bakedDocumentAbstractObjecter, BakedDocumentEntity, bakedDocumentIdObjecter, bakedDocumentKeywordObjecter, bakedDocumentTitleObjecter, type BakedDocumentLanguage, bakedDocumentAbstractDetailsObjecter } from "@business/domains/entities/bakedDocument";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { RosettaAPI, type SupportedLanguage } from "@interfaces/providers/rosetta";

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

		await mongo.bakedDocumentCollection.updateOne(
			{
				id: simpleBakedDocument.id,
			},
			{
				$set: {
					...simpleBakedDocument,
					createdAt: new Date(),
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
			.join(",");

		const listKeywordProcesses = await RosettaAPI
			.translateText(
				rawKeywordList,
				languageMapper[language.value],
			)
			.then(
				(result) => result
					.split(",").map((value) => value.trim()),
			)
			.then(
				(result) => new Set(result).values().toArray(),
			);

		return listKeywordProcesses.map((keyword) => bakedDocumentKeywordObjecter.unsafeCreate({
			value: keyword,
			pound: 1,
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

				const contentProcess = RosettaAPI.translateText(
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
};
