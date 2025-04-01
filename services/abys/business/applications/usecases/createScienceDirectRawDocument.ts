import { UsecaseHandler } from "@vendors/clean";
// repositories
import { rawDocumentRepository } from "../repositories/rawDocument";
// entities
import { ScienceDirectRawDocumentEntity } from "@business/domains/entities/document/raw/scienceDirect";
// types
import { type Url, type Date } from "@business/domains/types/common";
import { type BookshelfIdentifier, type DigitalObjectIdentifier, type Author, type Grant, type Title } from "@business/domains/types/raw/document";

interface Input {
	publicationDate: Date;
	sourceUrl: Url;
	authors: Author[] | null;
	grants: Grant[] | null;
	digitalObjectIdentifier: DigitalObjectIdentifier | null;
	bookshelfIdentifier: BookshelfIdentifier | null;
	title: Title;
}

export class CreateScienceDirectRawDocumentUsecase extends UsecaseHandler.create(
	{
		rawDocumentRepository,
	},
) {
	public execute(input: Input) {
		const rawDocument = ScienceDirectRawDocumentEntity.create({
			id: this.rawDocumentRepository.generateRawDocumentId(),
			...input,
		});

		return this.rawDocumentRepository.save(rawDocument);
	}
}
