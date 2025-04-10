import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type ArticleType } from "@business/domains/common/articleType";
import { providerObjecter } from "@business/domains/common/provider";
import { type RawResourceUrl, type RawAbstract, type RawAbstractPart, type RawAuthor, type RawGrant, type RawTitle } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentArticleId, type PubmedRawDocumentElectronicPublicationDate, PubmedRawDocumentEntity, type PubmedRawDocumentKeyword, type PubmedRawDocumentMeshTerm } from "@business/domains/entities/rawDocument/pubmed";
import { UsecaseHandler } from "@vendors/clean";
import { UpsertNodeSameRawDocumentUsecase } from "../../nodeSameRawDocument/upsertNodeSameRawDocument";

interface Input {
	resourceUrl: RawResourceUrl;
	title: RawTitle;
	authors: RawAuthor[];
	grants: RawGrant[];
	keywords: PubmedRawDocumentKeyword[];
	articleTypes: ArticleType[];
	articleIds: PubmedRawDocumentArticleId[];
	electronicPublicationDate: PubmedRawDocumentElectronicPublicationDate;
	abstract: RawAbstract | null;
	detailedAbstract: RawAbstractPart[] | null;
	meshTerms: PubmedRawDocumentMeshTerm[];
}

export class CreatePubmedRawDocumentUsecase extends UsecaseHandler.create({
	rawDocumentRepository,
	nodeSameRawDocumentRepository,
	upsertNodeSameRawDocument: UpsertNodeSameRawDocumentUsecase,
}) {
	public async execute(input: Input) {
		const rawDocument = PubmedRawDocumentEntity.create(input);

		await this.rawDocumentRepository.save(rawDocument);

		await this.upsertNodeSameRawDocument({
			provider: providerObjecter.unsafeCreate("pubmed"),
			rawDocument,
		});

		return rawDocument;
	}
}
