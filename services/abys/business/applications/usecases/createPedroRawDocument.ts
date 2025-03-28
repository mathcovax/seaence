import { UsecaseHandler } from "@vendors/clean";
// repositories
import { rawDocumentRepository } from "../repositories/rawDocument";
// entities
import { PedroRawDocumentEntity } from "@business/domains/entities/document/raw/pedro";
// types
import { type Url, type Date } from "@business/domains/types/common";
import { type Author, type Grant } from "@business/domains/types/raw/document";
import { type Content, type StructureContent, type Method } from "@business/domains/types/raw/pedro";

interface Input {
	publicationDate: Date;
	sourceUrl: Url;
	authors: Author[];
	grants: Grant[] | null;
	method: Method;
	content: Content;
	structureContent: StructureContent[] | null;
	links: Url[];
}

export class CreateRawDocumentUsecase extends UsecaseHandler.create(
	{
		rawDocumentRepository,
	},
) {
	public execute(input: Input) {
		const rawDocument = PedroRawDocumentEntity.create({
			id: this.rawDocumentRepository.generateRawDocumentId(),
			...input,
		});

		return this.rawDocumentRepository.save(rawDocument);
	}
}
