import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type ArticleType } from "@business/domains/common/articleType";
import { type RawResourceUrl, type RawAbstract, type RawAbstractPart, type RawAuthor, type RawGrant, type RawTitle, type RawKeyword } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentArticleId, PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type DateYYYYMMDD, type FlexibleDate, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { UpsertNodeSameRawDocumentUsecase } from "../../nodeSameRawDocument/upsertNodeSameRawDocument";
import { match, P } from "ts-pattern";
import { type UniqueField } from "@business/domains/common/uniqueField";

interface Input {
	resourceUrl: RawResourceUrl;
	title: RawTitle;
	authors: RawAuthor[] | null;
	grants: RawGrant[] | null;
	keywords: RawKeyword[];
	articleTypes: ArticleType[];
	articleIds: PubmedRawDocumentArticleId[];
	abstract: RawAbstract | null;
	detailedAbstract: RawAbstractPart[] | null;
	uniqueArticleField: UniqueField;
	webPublishDate: DateYYYYMMDD | null;
	journalPublishDate: FlexibleDate | null;
}

export class UpsertPubmedRawDocumentUsecase extends UsecaseHandler.create({
	rawDocumentRepository,
	nodeSameRawDocumentRepository,
	upsertNodeSameRawDocument: UpsertNodeSameRawDocumentUsecase,
}) {
	public async execute(input: Input) {
		const { resourceUrl } = input;

		const findedRawDocument = await this.rawDocumentRepository.findByResourceUrl(resourceUrl);

		const rawDocument = match({ rawDocument: findedRawDocument })
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				({ rawDocument }) => rawDocument
					.update(input),
			)
			.with(
				{ rawDocument: null },
				() => PubmedRawDocumentEntity
					.create(input),
			)
			.otherwise(
				() => new UsecaseError(
					"wrong-raw-document",
				),
			);

		if (rawDocument instanceof Error) {
			return rawDocument;
		}

		await this.rawDocumentRepository.save(rawDocument);

		await this.upsertNodeSameRawDocument({ rawDocument });

		return rawDocument;
	}
}
