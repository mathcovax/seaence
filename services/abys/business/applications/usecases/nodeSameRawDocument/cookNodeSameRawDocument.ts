import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type BakedDocumentLanguage } from "@business/domains/common/bakedDocumentLanguage";
import { type Provider } from "@business/domains/common/provider";
import { bakedDocumentAuthorObjecter } from "@business/domains/entities/bakedDocument";
import { type NodeSameRawDocumentEntity } from "@business/domains/entities/nodeSameRawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type ExpectType } from "@duplojs/utils";
import { promiseObject, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { match, P } from "ts-pattern";

interface Input {
	nodeSameRawDocument: NodeSameRawDocumentEntity;
	bakedDocumentLanguage: BakedDocumentLanguage;
}

const priority = ["pubmed"] as const;

type _AssertPriority = ExpectType<
	Provider["value"],
	typeof priority[number],
	"strict"
>;

export class CookNodeSameRawDocumentUsecase extends UsecaseHandler.create({
	rawDocumentRepository,
	bakedDocumentRepository,
}) {
	public async execute({ nodeSameRawDocument, bakedDocumentLanguage }: Input) {
		const rawDocumentWrapper = await this.rawDocumentRepository.findByNodeSameRawDocument(nodeSameRawDocument);

		const rawDocumentKey = priority.find((key) => !!rawDocumentWrapper[key]);

		return match({
			rawDocument: rawDocumentKey ? rawDocumentWrapper[rawDocumentKey] : undefined,
		})
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				({ rawDocument }) => promiseObject({
					nodeSameRawDocumentId: nodeSameRawDocument.id,
					articleTypes: rawDocument.articleTypes,
					authors: rawDocument.authors?.map(
						(author) => bakedDocumentAuthorObjecter.unsafeCreate(author.value),
					) ?? [],
					language: bakedDocumentLanguage,
					title: this.bakedDocumentRepository.makeBakedTitleWithRawTitle(
						rawDocument.title,
						bakedDocumentLanguage,
					),
					abstract: rawDocument.abstract
						? this.bakedDocumentRepository.makeBakedAbstractWithRawAbstract(
							rawDocument.abstract,
							bakedDocumentLanguage,
						)
						: null,
					resources: this.bakedDocumentRepository
						.makeBakedResourcesWithRawDocumentWrapper(rawDocumentWrapper),
					keywords: this.bakedDocumentRepository.makeBakedKeywordsWithKeywordPubmed(
						rawDocument.keywords,
						bakedDocumentLanguage,
					),
					abstractDetails: rawDocument.abstractDetails
						? this.bakedDocumentRepository.makeBakedAbstractDetailsWithRawAbstractDetails(
							rawDocument.abstractDetails,
							bakedDocumentLanguage,
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
					{
						nodeSameRawDocument,
						bakedDocumentLanguage,
					},
				),
			)
			.exhaustive();
	}
}
