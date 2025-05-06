import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type BakedDocumentId } from "@business/domains/entities/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	id: BakedDocumentId;
}

export class FindBakedDocumentByIdUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
}) {
	public execute({ id }: Input) {
		return this.bakedDocumentRepository.findOneById(id);
	}
}
