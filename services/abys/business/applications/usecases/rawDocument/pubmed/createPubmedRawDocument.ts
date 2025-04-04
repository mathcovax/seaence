import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type ArticleType } from "@business/domains/common/articleType";
import { type RawAbstract, type RawAbstractPart, type RawAuthor, type RawGrant, type RawTitle } from "@business/domains/common/rawDocument";
import { type PubmedRawDocumentArticleId, type PubmedRawDocumentElectronicPublicationDate, PubmedRawDocumentEntity, type PubmedRawDocumentKeyword, type PubmedRawDocumentMeshTerm, type PubmedRawDocumentResourceUrl } from "@business/domains/entities/rawDocument/pubmed";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	resourceUrl: PubmedRawDocumentResourceUrl;
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
}) {
	public execute(input: Input) {
		const rawDocument = new PubmedRawDocumentEntity(input);

		return this.rawDocumentRepository.save(rawDocument);
	}
}
