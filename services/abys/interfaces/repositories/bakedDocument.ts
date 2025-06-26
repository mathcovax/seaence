import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { bakedDocumentAbstractObjecter, BakedDocumentEntity, bakedDocumentKeywordObjecter, bakedDocumentTitleObjecter, bakedDocumentAbstractPartObjecter, bakedDocumentRessourceObjecter, type BakedDocumentRessource } from "@business/domains/entities/bakedDocument";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { RosettaAPI } from "@interfaces/providers/rosetta";
import { KeyDate } from "@interfaces/providers/keyDate";
import { match, P } from "ts-pattern";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { getTypedEntries } from "@duplojs/utils";

const DOIFoundationBaseUrl = "https://www.doi.org";

bakedDocumentRepository.default = {
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
	async makeBakedTitleWithRawTitle(cookingMode, rawTitle, language) {
		const title = rawTitle.value && await RosettaAPI.translate({
			provider: cookingMode.value,
			language: language.value,
			text: rawTitle.value,
		});

		return bakedDocumentTitleObjecter.unsafeCreate(title);
	},
	async makeBakedKeywordsWithKeywordPubmed(cookingMode, rawKeywordPubmeds, language) {
		const rawKeywordList = rawKeywordPubmeds
			.map((rawKeywordPubmed) => rawKeywordPubmed.value.value)
			.join("\n");

		const listKeywordProcesses = rawKeywordList
			? await RosettaAPI
				.translate({
					provider: cookingMode.value,
					text: rawKeywordList,
					language: language.value,
				})
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
	async makeBakedAbstractWithRawAbstract(cookingMode, rawAbstract, language) {
		const abstract = rawAbstract.value && await RosettaAPI.translate({
			provider: cookingMode.value,
			text: rawAbstract.value,
			language: language.value,
		});

		return bakedDocumentAbstractObjecter.unsafeCreate(abstract);
	},
	makeBakedAbstractDetailsWithRawAbstractDetails(cookingMode, rawAbstractDetails, language) {
		return Promise.all(
			rawAbstractDetails.map(
				({ value: { name, content } }) => RosettaAPI
					.translate({
						provider: cookingMode.value,
						text: `${name}\n${content}`,
						language: language.value,
					})
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
	makeBakedResourcesWithRawDocumentWrapper(rawDocumentWrapper) {
		const resources = getTypedEntries(rawDocumentWrapper)
			.map(
				([provider, rawDocument]) => match({
					provider,
					rawDocument,
				})
					.with(
						{ provider: "pubmed" },
						({ provider, rawDocument }) => bakedDocumentRessourceObjecter.unsafeCreate({
							resourceProvider: provider,
							url: rawDocument.resourceUrl.value,
						}),
					)
					.exhaustive(),
			);

		const findedDOIFoundationResources = Object.values({ ...rawDocumentWrapper })
			.reduce<null | BakedDocumentRessource>(
				(acc, rawDocument) => acc
					? acc
					: match({ rawDocument })
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
						.exhaustive(),
				null,
			);

		if (findedDOIFoundationResources) {
			resources.push(findedDOIFoundationResources);
		}

		return resources;
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
	async findManyById(ids) {
		const mongoBakedDocuments = await mongo.bakedDocumentCollection
			.find({
				id: { $in: ids.map((id) => id.value) },
			})
			.toArray();

		const missingBakedDocumentIds
				= ids.map(
					(id) => mongoBakedDocuments.find(
						(mongoBakedDocument) => mongoBakedDocument.id === id.value,
					)
						? null
						: id,
				)
					.filter((mybeyId) => !!mybeyId);

		if (missingBakedDocumentIds.length) {
			return new RepositoryError(
				"notfound-baked-document",
				{
					bakedDocumentIds: missingBakedDocumentIds,
				},
			);
		}

		return mongoBakedDocuments.map(
			(mongoEntity) => EntityHandler.unsafeMapper(
				BakedDocumentEntity,
				mongoEntity,
			),
		);
	},
};
