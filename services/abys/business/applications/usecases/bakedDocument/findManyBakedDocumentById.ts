import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { type BakedDocumentId } from "@business/domains/entities/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	bakedDocumentIds: BakedDocumentId[];
}

export class FindManyBakedDocumentByIdUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
}) {
	public execute({ bakedDocumentIds }: Input) {
		return this.bakedDocumentRepository
			.findManyById(bakedDocumentIds);
	}
}
