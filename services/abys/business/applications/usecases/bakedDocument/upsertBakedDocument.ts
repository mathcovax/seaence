import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { getTypedEntries, type ExpectType } from "@duplojs/utils";
import { match, P } from "ts-pattern";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { rawDocumentRepository, type ResultOfFindByNodeSameRawDocument } from "@business/applications/repositories/rawDocument";
import { type Provider } from "@business/domains/common/provider";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { bakedDocumentAuthorObjecter, BakedDocumentEntity, type BakedDocumentLanguage, type BakedDocumentRessource, bakedDocumentRessourceObjecter } from "@business/domains/entities/bakedDocument";

interface Input {
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	language: BakedDocumentLanguage;
}

const priority = ["pubmed"] as const;

type _AssertPriority = ExpectType<
	Provider["value"],
	typeof priority[number],
	"strict"
>;

export class UpsertBakedDocumentUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
	rawDocumentRepository,
}) {
	public async execute(input: Input) {
		const { nodeSameRawDocument, language } = input;
		const rawDocuments = await this.rawDocumentRepository.findByNodeSameRawDocument(nodeSameRawDocument);

		const rawDocumentKey = priority.find((key) => !!rawDocuments[key]);

		const bakedDocument = await match({
			rawDocument: rawDocumentKey ? rawDocuments[rawDocumentKey] : undefined,
		})
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				async({ rawDocument }) => BakedDocumentEntity.create({
					id: this.bakedDocumentRepository.makeBakedDocumentId(
						language,
						nodeSameRawDocument.id,
					),
					nodeSameRawDocumentId: nodeSameRawDocument.id,
					articleTypes: rawDocument.articleTypes,
					authors: rawDocument.authors?.map(
						(author) => bakedDocumentAuthorObjecter.unsafeCreate(author.value),
					) ?? [],
					language: language,
					title: await this.bakedDocumentRepository.makeBakedTitleWithRawTitle(
						rawDocument.title,
						language,
					),
					abstract: rawDocument.abstract
						? await this.bakedDocumentRepository.makeBakedAbstractWithRawAbstract(
							rawDocument.abstract,
							language,
						)
						: null,
					resources: this.computedRessources(rawDocuments),
					keywords: await this.bakedDocumentRepository.makeBakedKeywordsWithKeywordPubmed(
						rawDocument.keywords,
						language,
					),
					abstractDetails: rawDocument.abstractDetails
						? await this.bakedDocumentRepository.makeBakedAbstractDetailsWithRawAbstractDetails(
							rawDocument.abstractDetails,
							language,
						)
						: null,
					journalPublishDate: rawDocument.journalPublishDate,
					webPublishDate: rawDocument.webPublishDate,
				}),
			)
			.with(
				{ rawDocument: undefined },
				() => new UsecaseError(
					"unmatching-priority-raw-document",
				),
			)
			.exhaustive();

		if (bakedDocument instanceof Error) {
			return bakedDocument;
		}

		return this.bakedDocumentRepository.save(bakedDocument);
	}

	private computedRessources(rawDocuments: ResultOfFindByNodeSameRawDocument) {
		const resources = getTypedEntries(rawDocuments)
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

		const findedDOIFoundationResources = this.bakedDocumentRepository
			.findDOIFoundationResourcesInRawDocument(Object.values({ ...rawDocuments }));

		if (findedDOIFoundationResources) {
			resources.push(findedDOIFoundationResources);
		}

		return resources;
	}
}
