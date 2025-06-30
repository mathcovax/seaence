import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type ArticleType } from "@business/domains/common/articleType";
import { type RawResourceUrl, type RawAbstract, type RawAbstractPart, type RawAuthor, type RawGrant, type RawTitle, type RawKeyword } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentArticleId, PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { type FlexibleDate, UsecaseHandler } from "@vendors/clean";
import { UpsertNodeSameRawDocumentUsecase } from "../../nodeSameRawDocument/upsertNodeSameRawDocument";
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
	abstractDetails: RawAbstractPart[] | null;
	uniqueArticleField: UniqueField;
	webPublishDate: FlexibleDate | null;
	journalPublishDate: FlexibleDate | null;
}

export class UpsertPubmedRawDocumentUsecase extends UsecaseHandler.create({
	rawDocumentRepository,
	nodeSameRawDocumentRepository,
	upsertNodeSameRawDocument: UpsertNodeSameRawDocumentUsecase,
}) {
	public async execute(input: Input) {
		const { resourceUrl } = input;

		const rawDocument = PubmedRawDocumentEntity.create(input);

		if (rawDocument instanceof Error) {
			return rawDocument;
		}

		const findedRawDocument = await this.rawDocumentRepository.findByResourceUrl(resourceUrl);

		await this.rawDocumentRepository.save(rawDocument);

		if (!findedRawDocument || !this.rawDocumentRepository.isEqual(rawDocument, findedRawDocument)) {
			await this.upsertNodeSameRawDocument({ rawDocument });
		}

		return rawDocument;
	}
}
