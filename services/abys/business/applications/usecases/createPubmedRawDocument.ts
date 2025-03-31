import { UsecaseHandler } from "@vendors/clean";
// repositories
import { rawDocumentRepository } from "../repositories/rawDocument";
// entities
import { PubmedRawDocumentEntity } from "@business/domains/entities/document/raw/pubmed";
// types
import { type Url, type Date } from "@business/domains/types/common";
import { type Keyword, type Author, type Grant, type BookshelfIdentifier, type DigitalObjectIdentifier } from "@business/domains/types/raw/document";
import { type AssociatedData, type CitedBy, type MeshTerm, type Reference, type RelatedInformation, type SimilarArticle, type Comment, type Figure, type LinkOut, type Chemical, type PubmedId, type Expect, type Abtstract, type ArticleType } from "@business/domains/types/raw/pubmed";

interface Input {
	publicationDate: Date;
	sourceUrl: Url;
	authors: Author[] | null;
	grants: Grant[] | null;
	pubmedId: PubmedId;
	keywords: Keyword[];
	figures: Figure[] | null;
	comments: Comment[] | null;
	similarArticles: SimilarArticle[] | null;
	citedBys: CitedBy[] | null;
	references: Reference[] | null;
	meshTerms: MeshTerm[] | null;
	associatedDatas: AssociatedData[] | null;
	relatedInformations: RelatedInformation[] | null;
	linkOuts: LinkOut[] | null;
	chemicals: Chemical[] | null;
	articleTypes: ArticleType[];
	expect: Expect | null;
	abstract: Abtstract | null;
	digitalObjectIdentifier: DigitalObjectIdentifier | null;
	bookshelfIdentifier: BookshelfIdentifier | null;
}

export class CreatePubmedRawDocumentUsecase extends UsecaseHandler.create(
	{
		rawDocumentRepository,
	},
) {
	public execute(input: Input) {
		const rawDocument = PubmedRawDocumentEntity.create({
			id: this.rawDocumentRepository.generateRawDocumentId(),
			...input,
		});

		return this.rawDocumentRepository.save(rawDocument);
	}
}
