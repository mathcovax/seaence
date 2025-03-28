import { UsecaseHandler } from "@vendors/clean";
// repositories
import { rawDocumentRepository } from "../repositories/rawDocument";
// types
import { type DocumentId } from "@business/domains/types/raw/document";

interface Input {
	id: DocumentId;
}

export class ConsultRawDocumentUsecase extends UsecaseHandler.create(
	{
		rawDocumentRepository,
	},
) {
	public execute({ id }: Input) {
		return this.rawDocumentRepository.findByDocumentId(id);
	}
}
