import { flexibleDateObjecter, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type ExpectType } from "@duplojs/utils";
import { match, P } from "ts-pattern";
import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { rawDocumentRepository, type ResultOfFindByNodeSameRawDocument } from "@business/applications/repositories/rawDocument";
import { providerEnum, type Provider } from "@business/domains/common/provider";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { BakedDocumentEntity, type BakedDocumentLanguage, type BakedDocumentRessources, bakedDocumentRessourcesObjecter } from "@business/domains/entities/bakedDocument";

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

const ressourcesKey = providerEnum.toTuple();

export class UpsertBakedDocumentUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
	rawDocumentRepository,
}) {
	public async execute(input: Input) {
		const { nodeSameRawDocument, language } = input;
		const [rawDocuments, currentBakedDocument] = await Promise.all([
			this.rawDocumentRepository.findByNodeSameRawDocument(nodeSameRawDocument),
			this.bakedDocumentRepository.findByNodeSameRawDocument(nodeSameRawDocument),
		]);

		const rawDocumentKey = priority.find((key) => !!rawDocuments[key]);

		const bakedDocument = await match({
			rawDocument: rawDocumentKey ? rawDocuments[rawDocumentKey] : undefined,
		})
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				async({ rawDocument }) => BakedDocumentEntity.create({
					id: currentBakedDocument?.id ?? this.bakedDocumentRepository.generateBakedDocumentId(),
					nodeSameRawDocumentId: nodeSameRawDocument.id,
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
					abstractDetails: rawDocument.detailedAbstract
						? await this.bakedDocumentRepository.makeBakedAbstractDetailsWithRawAbstractDetails(
							rawDocument.detailedAbstract,
							language,
						)
						: null,
					journalPublishDate: rawDocument.journalPublishDate,
					webPublishDate: rawDocument.webPublishDate
						? flexibleDateObjecter.unsafeCreate({
							day: rawDocument.webPublishDate.value.getDay(),
							month: rawDocument.webPublishDate.value.getMonth(),
							year: rawDocument.webPublishDate.value.getFullYear(),
						})
						: null,
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
		return bakedDocumentRessourcesObjecter.unsafeCreate(
			ressourcesKey.reduce<BakedDocumentRessources["value"]>(
				(acc, provider) => {
					const rawDocument = rawDocuments[provider];

					if (!rawDocument) {
						return acc;
					}

					return {
						...acc,
						[provider]: {
							name: provider,
							url: rawDocument.resourceUrl.value,
						},
					};
				},
				{},
			),
		);
	}
}
