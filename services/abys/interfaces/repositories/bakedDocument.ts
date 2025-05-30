import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { bakedDocumentAbstractObjecter, BakedDocumentEntity, bakedDocumentIdObjecter, bakedDocumentKeywordObjecter, bakedDocumentTitleObjecter, type BakedDocumentLanguage, bakedDocumentAbstractPartObjecter, bakedDocumentRessourceObjecter } from "@business/domains/entities/bakedDocument";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { RosettaAPI, type SupportedLanguage } from "@interfaces/providers/rosetta";
import { KeyDate } from "@interfaces/providers/keyDate";
import { match, P } from "ts-pattern";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { asyncMessage } from "@interfaces/providers/asyncMessage";

const languageMapper: Record<BakedDocumentLanguage["value"], SupportedLanguage> = {
	"fr-FR": "fr",
	"en-US": "en",
};

const DOIFoundationBaseUrl = "https://www.doi.org";

bakedDocumentRepository.default = {
	makeBakedDocumentId(language, nodeSameRawDocumentId) {
		return bakedDocumentIdObjecter.unsafeCreate(`${nodeSameRawDocumentId.value}_${language.value}`);
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

		if (beforeBakedDocument) {
			await asyncMessage.collections.renameDocument.emit({
				documentId: simpleBakedDocument.id,
				newTitle: simpleBakedDocument.title,
				oldTitle: beforeBakedDocument.title,
			});
		}

		return bakedDocument;
	},
	async makeBakedTitleWithRawTitle(rawTitle, language) {
		const title = rawTitle.value && await RosettaAPI.translateText(
			rawTitle.value,
			languageMapper[language.value],
		);

		return bakedDocumentTitleObjecter.unsafeCreate(title);
	},
	async makeBakedKeywordsWithKeywordPubmed(rawKeywordPubmeds, language) {
		const rawKeywordList = rawKeywordPubmeds
			.map((rawKeywordPubmed) => rawKeywordPubmed.value.value)
			.join("\n");

		const listKeywordProcesses = rawKeywordList
			? await RosettaAPI
				.translateText(
					rawKeywordList,
					languageMapper[language.value],
				)
				.then(
					(result) => result.split("\n").map((value) => value.trim()),
				)
				.then(
					(result) => new Set(result).values().toArray(),
				)
			: [];

		return listKeywordProcesses.map((keyword) => bakedDocumentKeywordObjecter.unsafeCreate({
			value: keyword,
		}));
	},
	async makeBakedAbstractWithRawAbstract(rawAbstract, language) {
		const abstract = rawAbstract.value && await RosettaAPI.translateText(
			rawAbstract.value,
			languageMapper[language.value],
		);

		return bakedDocumentAbstractObjecter.unsafeCreate(abstract);
	},
	makeBakedAbstractDetailsWithRawAbstractDetails(rawAbstractDetails, language) {
		return Promise.all(
			rawAbstractDetails.map(
				({ value: { name, content } }) => RosettaAPI
					.translateText(`${name}\n${content}`, languageMapper[language.value])
					.then(
						(content) => {
							const [label, ...contents] = content.split("\n");

							return bakedDocumentAbstractPartObjecter.unsafeCreate({
								name,
								label,
								content: contents.join("\n"),
							});
						},
					),
			),
		);
	},
	async *findUpdatedDocuments() {
		const startPage = 0;
		const quantityPerPage = 10;

		const lastSend = await KeyDate.get("lastSendBakedDocument");
		const newLastSend = new Date();

		for (let page = startPage; true; page++) {
			const bakedDocuments = await mongo
				.bakedDocumentCollection
				.find(
					{
						lastUpdate: {
							$gte: lastSend,
						},
					},
					{ projection: { _id: 0 } },
				)
				.sort({ lastUpdate: 1 })
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.toArray();

			if (!bakedDocuments.length) {
				break;
			}

			for (const bakedDocument of bakedDocuments) {
				yield EntityHandler.unsafeMapper(
					BakedDocumentEntity,
					bakedDocument,
				);
			}

			const lastBakedDocument = bakedDocuments.pop();

			await KeyDate.set("lastSendBakedDocument", lastBakedDocument!.lastUpdate);
		}

		await KeyDate.set("lastSendBakedDocument", newLastSend);
	},
	findDOIFoundationResourcesInRawDocument(rawDocuments) {
		for (const rawDocument of rawDocuments) {
			const resource = match({ rawDocument })
				.with(
					{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
					({ rawDocument }) => {
						const articleId = rawDocument.articleIds.find(
							({ value: { name } }) => name === "doi",
						);

						if (!articleId) {
							return null;
						}

						return bakedDocumentRessourceObjecter.unsafeCreate({
							resourceProvider: "DOIFoundation",
							url: `${DOIFoundationBaseUrl}/${articleId.value.value}`,
						});
					},
				)
				.exhaustive();

			if (resource) {
				return resource;
			}
		}

		return null;
	},

	async findOneById(id) {
		const bakedDocumentMongo = await mongo.bakedDocumentCollection.findOne(
			{
				id: id.value,
			},
		);

		if (!bakedDocumentMongo) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			BakedDocumentEntity,
			{ ...bakedDocumentMongo },
		);
	},
};
